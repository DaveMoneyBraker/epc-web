import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import axios from "axios";
import { redirect } from "react-router-dom";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const useAxiosErrorHandler = (refreshToken: () => Promise<any>) => {
  const showNotification = APP_HOOKS.useNotification();

  return React.useCallback(
    (error: any) => {
      // DON'T SHOW NOTIFICATION IF REQUEST WAS CANCELED BY OUR SIGNAL
      if (error.code === "ERR_CANCELED" || axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
        return;
      }
      console.log("RESPONSE ERROR: ", { error });

      const errorMessage =
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred";

      const statusCode = error.response?.status;

      switch (statusCode) {
        case 401:
          refreshToken();
          break;
        case 403:
          redirect(APP_CONSTANTS.APP_ROUTES.LOGIN);
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
    [showNotification, refreshToken]
  );
};
