import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import { AxiosContext } from "./AxiosContext";
import { encodeConfigURI } from "./encodeConfigURI";
import AppHooks from "../../hooks/0_AppHooks";
import { AuthToken, TOKEN } from "../../types";
import APP_CONSTANTS from "../../constants/AppConstants";
import { AppRoutes } from "../../core/router";

interface Props {
  children: React.ReactNode;
}

export const AxiosProvider: React.FC<Props> = ({ children }) => {
  const getApiUrl = AppHooks.useApiUrlLoader();
  const [get] = AppHooks.useLocalStorage();
  const showNotification = AppHooks.useNotification();
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);
  const loading = React.useMemo(
    () => pendingRequestsCount > 0,
    [pendingRequestsCount]
  );

  const updateRequestsCount = React.useCallback(
    (v: number) => setPendingRequestsCount((prev) => Math.max(0, prev + v)),
    [setPendingRequestsCount]
  );

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
      // SET DEFAULT HEDERS
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

    // ENCODE REQUEST QUERY
    return encodeConfigURI(config);
  });

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (config) => {
      updateRequestsCount(-1);

      // SHOW SUCCESS NOTIFICATION ON NON GET REQUESTS
      if (
        (config.status === 200 || config.status === 201) &&
        config.config.method !== "get"
      ) {
        showNotification("Success!", APP_CONSTANTS.NOTIFICATION_VARIANTS.INFO);
      }
      return config;
    },
    // ERRORS HANDLING
    (error) => {
      updateRequestsCount(-1);
      handleAxiosError(error);
      return Promise.reject(error);
    }
  );

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
