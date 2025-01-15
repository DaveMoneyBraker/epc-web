import React from "react";
import { useAxiosContext } from "../../providers/axios";
import AppUtils from "../../utils/0_AppUtils";
import { useMutation } from "@tanstack/react-query";

export const useDownloadServerFileMutation = (apiUrl: string) => {
  const { axios } = useAxiosContext();
  const mutationFn = React.useCallback(
    async (input: { id: string; filename: string }) => {
      if (axios) {
        const { id, filename } = input;
        const url = apiUrl + "/" + id;
        const res = await axios.get(url, { responseType: "text" });
        if (res) {
          AppUtils.downloadFile(res, filename);
          return res;
        }
      }
    },
    [apiUrl, axios]
  );

  return useMutation({ mutationFn });
};
