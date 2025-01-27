import React from "react";
import axios, { CancelTokenSource } from "axios";
import { useLocation } from "react-router-dom";
import { AxiosContext } from "./AxiosContext";
import { encodeConfigURI } from "./encodeConfigURI";
import AppHooks from "../../hooks/0_AppHooks";
import { AuthToken, CacheItem } from "../../types";
import APP_CONSTANTS from "../../constants/AppConstants";
import AxiosProviderHooks from "./hooks/AxiosProviderHooks";

interface Props {
  children: React.ReactNode;
}

interface QueueItem {
  promise: Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export const AxiosProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const getApiUrl = AppHooks.useApiUrlLoader();
  const { get } = AppHooks.useLocalStorage();
  const showNotification = AppHooks.useNotification();
  const initialDataLoaded = AppHooks.useInitialDataLoaded();
  const { refresh, refreshToken } = AxiosProviderHooks.useRefreshToken();
  const handleAxiosError =
    AxiosProviderHooks.useAxiosErrorHandler(refreshToken);
  const getCacheKey = AxiosProviderHooks.useCacheKey();
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);
  const requestQueue = React.useRef<QueueItem[]>([]);
  const cache = React.useRef<Map<string, CacheItem>>(new Map());
  const activeRequests = React.useRef<Map<string, CancelTokenSource>>(
    new Map()
  );
  const CACHE_DURATION = React.useMemo(() => 5 * 60 * 1000, []); // 5 minutes
  const PROTECTED_ROUTES = React.useMemo(
    () => [
      APP_CONSTANTS.API_ROUTES.CURRENT_USER,
      APP_CONSTANTS.API_ROUTES.CURRENT_USER_ROLES,
      APP_CONSTANTS.API_ROUTES.CURRENT_USER_PERMISSIONS,
      APP_CONSTANTS.API_ROUTES.LOGIN,
      APP_CONSTANTS.API_ROUTES.LOGOUT,
    ],
    []
  );
  const loading = React.useMemo(
    () => pendingRequestsCount > 0,
    [pendingRequestsCount]
  );

  const updateRequestsCount = React.useCallback(
    (v: number) => setPendingRequestsCount((prev) => Math.max(0, prev + v)),
    [setPendingRequestsCount]
  );

  const cancelPendingRequests = React.useCallback(() => {
    activeRequests.current.forEach((source, url) => {
      if (!PROTECTED_ROUTES.includes(url)) {
        updateRequestsCount(-1);
        source.cancel("Request cancelled due to page navigation");
        activeRequests.current.delete(url);
      }
    });
  }, [PROTECTED_ROUTES, updateRequestsCount]);

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

  // const getCacheKey = React.useCallback((config: any) => {
  //   return `${config.method}-${config.url}-${JSON.stringify(
  //     config.params || {}
  //   )}-${JSON.stringify(config.data || {})}`;
  // }, []);

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
      const apiToken = get(APP_CONSTANTS.LOCAL_STORAGE.TOKEN) as AuthToken;
      config.headers.Authorization =
        apiToken && apiToken.token ? `Bearer ${apiToken.token}` : "";
    }

    // TRACK NON INITIAL REQUEST TO FURTHER CANCELING THEM ON PAGE CHANGE
    if (config.url && !PROTECTED_ROUTES.includes(config.url)) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      activeRequests.current.set(config.url, source);
    }

    // IF TOKEN IS REFRESHING OR IT'S NOT ACCOUNT, USER OR AUTH REQUEST
    // PUT REQUEST IN QUEUE
    if (
      refresh ||
      (!initialDataLoaded &&
        config.url &&
        !PROTECTED_ROUTES.includes(config.url))
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

      // DELETE REQUEST FROM ACTIVE REQUESTS
      if (response.config.url) {
        activeRequests.current.delete(response.config.url);
      }

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
      // IF IT 403 ERROR
      // CLEAR ALL ACTIVE AND PENDING REQUESTS
      // AND CLEAR CACHE
      if (error.response?.status === 403) {
        activeRequests.current.clear();
        cache.current.clear();
        requestQueue.current = [];
      }
      handleAxiosError(error);
      // DELETE REQUEST FROM ACTIVE REQUESTS
      if (error.config?.url) {
        activeRequests.current.delete(error.config.url);
      }
      // IF IT 401 ERROR - PUT REQUEST IN TO QUEUE
      if (error.response?.status === 401) {
        const { config } = error.response;
        if (config) {
          return new Promise((resolve, reject) => {
            requestQueue.current.push({
              promise: Promise.resolve(config),
              resolve,
              reject,
            });
          });
        }
      }
      return Promise.reject(error);
    }
  );

  // PROCESS REQUEST QUEUE WHEN INITIAL DATA IS LOADED OR TOKEN IS REFRESHED
  React.useEffect(() => {
    if ((!refresh || initialDataLoaded) && requestQueue.current.length > 0) {
      processQueue();
    }
  }, [initialDataLoaded, refresh, processQueue]);

  // CANCEL PENDING REQUESTS ON LOCATION CHANGE
  React.useEffect(() => {
    cancelPendingRequests();
  }, [location, cancelPendingRequests]);

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
