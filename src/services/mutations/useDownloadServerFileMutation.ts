import React from "react";
import AppUtils from "../../utils/0_AppUtils";
import { useMutation } from "@tanstack/react-query";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import ContextHooks from "../../providers/0_ContextHooks";

export const useDownloadServerFileMutation = (apiUrl: string) => {
  const { axios } = ContextHooks.useAxiosContext();
  const axiosResponseValidator = APP_HOOKS.useAxiosResponseValidator();

  const mutationFn = React.useCallback(
    async (input: { id: string; filename: string }) => {
      if (!axios) {
        throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
      }
      try {
        const { id, filename } = input;
        const url = apiUrl + "/" + id;

        const response = await axios.get(url, { responseType: "text" });
        const errorMessage = axiosResponseValidator(response);

        if (errorMessage) {
          throw new Error(errorMessage);
        }

        AppUtils.downloadFile(response, filename);
        return response;
      } catch (error) {
        console.error("useDownloadServerFileMutation query error:", error);
        throw error;
      }
    },
    [apiUrl, axios, axiosResponseValidator]
  );

  return useMutation({ mutationFn });
};
