import React from "react";
import { ApiRoutes, AppRoutes } from "../../../core/router";
import axios from "axios";
import AppHooks from "../../../hooks/0_AppHooks";
import { redirect } from "react-router-dom";
import { NOTIFICATION_VARIANTS } from "../../../constants/NotificationVariants";
import APP_CONSTANTS from "../../../constants/AppConstants";

export const useRefreshToken = () => {
  const [, setToLocalStorage, clear] = AppHooks.useLocalStorage();
  const getApiUrl = AppHooks.useApiUrlLoader();
  const showNotification = AppHooks.useNotification();
  const [refresh, setRefresh] = React.useState(false);

  const refreshToken = React.useCallback(async () => {
    setRefresh(true);
    const baseUrl = await getApiUrl();
    const url = baseUrl + ApiRoutes.REFRESH_TOKEN;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      const { data } = response;
      setToLocalStorage(APP_CONSTANTS.LOCAL_STORAGE.TOKEN, data);
    } catch (error) {
      console.log("REFRESH TOKEN ERROR: ", { error });
      clear();
      showNotification(
        "Token Refresh Error. Try Login again",
        NOTIFICATION_VARIANTS.ERROR
      );
      redirect(AppRoutes.LOGIN);
    } finally {
      setRefresh(false);
    }
  }, [getApiUrl, setToLocalStorage, clear, showNotification]);

  return { refresh, refreshToken };
};
