import React from "react";
import axios from "axios";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { redirect } from "react-router-dom";
import { NOTIFICATION_VARIANTS } from "../../../constants/NotificationVariants";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const useRefreshToken = () => {
  const { set, clear } = APP_HOOKS.useLocalStorage();
  const getApiUrl = APP_HOOKS.useApiUrlLoader();
  const showNotification = APP_HOOKS.useNotification();
  const [refresh, setRefresh] = React.useState(false);

  const refreshToken = React.useCallback(async () => {
    setRefresh(true);
    const baseUrl = await getApiUrl();
    const url = baseUrl + APP_CONSTANTS.API_ROUTES.REFRESH_TOKEN;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      const { data } = response;
      set(APP_CONSTANTS.LOCAL_STORAGE.TOKEN, data);
    } catch (error) {
      console.log("REFRESH TOKEN ERROR: ", { error });
      clear();
      showNotification(
        "Token Refresh Error. Try Login again",
        NOTIFICATION_VARIANTS.ERROR
      );
      redirect(APP_CONSTANTS.APP_ROUTES.LOGIN);
    } finally {
      setRefresh(false);
    }
  }, [getApiUrl, set, clear, showNotification]);

  return { refresh, refreshToken };
};
