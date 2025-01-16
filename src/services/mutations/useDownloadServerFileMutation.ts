import React from "react";
import { useAxiosContext } from "../../providers/axios";
import AppUtils from "../../utils/0_AppUtils";
import { useMutation } from "@tanstack/react-query";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppResponseValidators from "../../validators/response/0_ResponseValidators";

export const useDownloadServerFileMutation = (apiUrl: string) => {
  const { axios } = useAxiosContext();
  const mutationFn = React.useCallback(
    async (input: { id: string; filename: string }) => {
      if (!axios) {
        throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
      }
      try {
        const { id, filename } = input;
        const url = apiUrl + "/" + id;

        const response = await axios.get(url, { responseType: "text" });
        const errorMessage =
          AppResponseValidators.validateAxiosResponse(response);

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
    [apiUrl, axios]
  );

  return useMutation({ mutationFn });
};
