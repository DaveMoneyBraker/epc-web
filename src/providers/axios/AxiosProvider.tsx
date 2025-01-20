import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import { AxiosContext } from "./AxiosContext";
import { encodeConfigURI } from "./encodeConfigURI";
import AppHooks from "../../hooks/0_AppHooks";
import { AuthToken, TOKEN } from "../../types";
import APP_CONSTANTS from "../../constants/AppConstants";
import { ApiRoutes, AppRoutes } from "../../core/router";

interface Props {
  children: React.ReactNode;
}

interface CacheItem {
  data: any;
  timestamp: number;
}

interface QueueItem {
  promise: Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export const AxiosProvider: React.FC<Props> = ({ children }) => {
  const PROTECTED_ROUTES = React.useMemo(
    () => [
      ApiRoutes.CURRENT_USER,
      ApiRoutes.CURRENT_USER_ROLES,
      ApiRoutes.CURRENT_USER_PERMISSIONS,
      ApiRoutes.LOGIN,
      ApiRoutes.LOGOUT,
    ],
    []
  );
  const getApiUrl = AppHooks.useApiUrlLoader();
  const [get] = AppHooks.useLocalStorage();
  const showNotification = AppHooks.useNotification();
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);
  const requestQueue = React.useRef<QueueItem[]>([]);
  const cache = React.useRef<Map<string, CacheItem>>(new Map());
  const CACHE_DURATION = React.useMemo(() => 5 * 60 * 1000, []); // 5 minutes
  const initialDataLoaded = AppHooks.useInitialDataLoaded();

  const loading = React.useMemo(
    () => pendingRequestsCount > 0,
    [pendingRequestsCount]
  );

  const updateRequestsCount = React.useCallback(
    (v: number) => setPendingRequestsCount((prev) => Math.max(0, prev + v)),
    [setPendingRequestsCount]
  );

  const clearCache = React.useCallback(() => {
    const now = Date.now();
    [...cache.current.entries()].forEach(([key, value]) => {
      if (now - value.timestamp > CACHE_DURATION) {
        cache.current.delete(key);
      }
    });
  }, [CACHE_DURATION]);

  // PERIODICALLY CLEAR CACHE
  React.useEffect(() => {
    const interval = setInterval(clearCache, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [CACHE_DURATION, clearCache]);

  const processQueue = React.useCallback(async () => {
    if (requestQueue.current.length === 0) return;

    const { promise, resolve, reject } = requestQueue.current[0];
    try {
      const result = await promise;
      resolve(result);
    } catch (error) {
      console.log("Request processing failed:", error);
      reject(error);
    } finally {
      requestQueue.current.shift();
      if (requestQueue.current.length > 0) {
        processQueue();
      }
    }
  }, [requestQueue]);

  const getCacheKey = React.useCallback((config: any) => {
    return `${config.method}-${config.url}-${JSON.stringify(
      config.params || {}
    )}-${JSON.stringify(config.data || {})}`;
  }, []);

  const handleAxiosError = React.useCallback(
    (error: any) => {
      // DON'T SHOW NOTIFICATION IF REQUEST WAS CANCELED BY OUR SIGNAL
      if (error.code === "ERR_CANCELED") return;
      console.log("RESPONSE ERROR: ", { error });

      const errorMessage =
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred";

      const statusCode = error.response?.status;

      switch (statusCode) {
        case 401:
        case 403:
          cache.current.clear(); // CLEAR CACHE ON AUTH ERRORS
          redirect(AppRoutes.LOGIN);
          break;
        case 404:
          showNotification(
            "Resource not found",
            APP_CONSTANTS.NOTIFICATION_VARIANTS.WARNING
          );
          break;
        case 500:
          showNotification(
            "Server error",
            APP_CONSTANTS.NOTIFICATION_VARIANTS.ERROR
          );
          break;
        default:
          showNotification(
            errorMessage,
            APP_CONSTANTS.NOTIFICATION_VARIANTS.ERROR
          );
      }
    },
    [showNotification]
  );

  const instance = axios.create({
    headers: {
      // SET DEFAULT HEADERS
      "Access-Control-Max-Age": 600,
      "Content-Type": "application/json; charset=utf-8",
      // DISABLE NGROK CORS ERRORS
      "ngrok-skip-browser-warning": true,
    },
    timeout: 10000,
  });

  // REQUEST INTERCEPTOR
  instance.interceptors.request.use(async (config) => {
    updateRequestsCount(1);

    // SETUP BASE URL
    config.baseURL = await getApiUrl();

    // SETUP AUTH TOKEN IF IT IS NOT LOGIN
    if (config.url !== "auth/login") {
      const apiToken = get(TOKEN) as AuthToken;
      config.headers.Authorization =
        apiToken && apiToken.token ? `Bearer ${apiToken.token}` : "";
    }

    // UNLESS IT'S ACCOUNT, USER OR AUTH REQUEST
    // PUT REQUEST IN QUEUE
    if (
      !initialDataLoaded &&
      config.url &&
      !PROTECTED_ROUTES.includes(config.url)
    ) {
      return new Promise((resolve, reject) => {
        requestQueue.current.push({
          promise: Promise.resolve(config),
          resolve,
          reject,
        });
      });
    }

    // CHECK CACHE FOR GET REQUESTS
    if (config.method === "get") {
      const cacheKey = getCacheKey(config);
      const cachedResponse = cache.current.get(cacheKey);
      if (
        cachedResponse &&
        Date.now() - cachedResponse.timestamp < CACHE_DURATION
      ) {
        return Promise.resolve({
          ...config,
          cached: true,
          data: cachedResponse.data,
        });
      }
    }

    // ENCODE REQUEST QUERY
    return encodeConfigURI(config);
  });

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (response) => {
      updateRequestsCount(-1);

      // CACHE GET RESPONSE
      if (
        response.config.method === "get" &&
        !(response.config as any).cached
      ) {
        const cacheKey = getCacheKey(response.config);
        cache.current.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      }

      // SHOW SUCCESS NOTIFICATION ON NON GET REQUESTS
      if (
        (response.status === 200 || response.status === 201) &&
        response.config.method !== "get"
      ) {
        showNotification(
          "Success!",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.SUCCESS
        );
      }
      return response;
    },
    // ERRORS HANDLING
    (error) => {
      updateRequestsCount(-1);
      handleAxiosError(error);
      return Promise.reject(error);
    }
  );

  // PROCESS REQUEST QUEUE WHEN INITIAL DATA IS LOADED
  React.useEffect(() => {
    if (initialDataLoaded && requestQueue.current.length > 0) {
      processQueue();
    }
  }, [initialDataLoaded, processQueue]);

  const contextValue = React.useMemo(
    () => ({
      axios: instance,
      loading,
    }),
    [instance, loading]
  );

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
};
