import React from "react";
import { AxiosResponse } from "axios";
import APP_CONSTANTS from "../constants/0_AppConstants";
import APP_HOOKS from "./0_AppHooks";
import { ValidationHookResult } from "../types";

export type UseAxiosResponseValidator = <T = any>() => ValidationHookResult<T>;

export const useAxiosResponseValidator: UseAxiosResponseValidator = <
  T = any
>() => {
  const showNotification = APP_HOOKS.useNotification();
  const [err, setErr] = React.useState<string>("");

  React.useEffect(() => {
    if (err) {
      showNotification(err, APP_CONSTANTS.NOTIFICATION_VARIANTS.ERROR);
    }
  }, [err, showNotification]);

  return React.useCallback(
    (
      response: AxiosResponse | null,
      validators: ((response: AxiosResponse<T>) => string)[] = []
    ) => {
      if (!response) {
        // IF THERE IS NO RESPONSE - NO NEED TO SHOW NOTIFICATION
        return APP_CONSTANTS.APP_ERRORS.NO_SERVER_RESPONSE;
      }

      if (!response.data) {
        setErr(APP_CONSTANTS.APP_ERRORS.INVALID_SERVER_RESPONSE);
        return APP_CONSTANTS.APP_ERRORS.INVALID_SERVER_RESPONSE;
      }

      const validatorsError = validators
        .map((validator) => validator(response))
        .filter(Boolean)
        .join(" ");

      if (validatorsError) {
        setErr(validatorsError);
      }

      return validatorsError || null;
    },
    [setErr]
  );
};
