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
  const [loading, setLoading] = React.useState(false);
  const getApiUrl = AppHooks.useApiUrlLoader();
  const [get] = AppHooks.useLocalStorage();
  const showNotification = AppHooks.useNotification();

  const instance = axios.create({
    headers: {
      // SET DEFAULT HEDERS
      "Access-Control-Max-Age": 600,
      "Content-Type": "application/json; charset=utf-8",
      // DISABLE NGROK CORS ERRORS
      "ngrok-skip-browser-warning": true,
    },
  });

  // REQUEST INTERCEPTOR
  instance.interceptors.request.use(async (config) => {
    setLoading(true);

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
      setLoading(false);

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
      setLoading(false);

      console.log("RESPONSE ERROR: ", { error });
      // DON'T SHOW NOTIFICATION IF REQUEST WAS CANCELED BY OUR SIGNAL
      if (error.code !== "ERR_CANCELED") {
        showNotification(
          error.response?.data?.message || error.message || "Unhandled error",
          APP_CONSTANTS.NOTIFICATION_VARIANTS.ERROR
        );
      }
      // UNAUTHORIZED LOGOUT
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
        // TODO
        // REFRESH TOKEN ON 403
      ) {
        redirect(AppRoutes.LOGIN);
      }
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={{ axios: instance, loading }}>
      {children}
    </AxiosContext.Provider>
  );
};
