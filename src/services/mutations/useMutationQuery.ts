import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosContext } from "../../providers/axios";
import AppUtils from "../../utils/0_AppUtils";
import APP_CONSTANTS from "../../constants/AppConstants";

export const useMutationQuery = (apiUrl: string, queryKey: string) => {
  const { axios } = useAxiosContext();
  const queryClient = useQueryClient();
  const mutationFn = React.useCallback(
    async (input: { body?: any; method: "post" | "delete" | "put" }) => {
      try {
        if (!axios) {
          throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
        }
        const { body = {}, method } = input;
        const url =
          method === "post"
            ? apiUrl
            : apiUrl + "/" + (body as { id: string }).id;

        const response = await axios[method](url, { ...body });
        const errorMessage = AppUtils.getAxiosResponseError(response);

        if (errorMessage) {
          throw new Error(errorMessage);
        }

        if (response) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return response.data;
        }
      } catch (error) {
        console.error("Mutation query error:", error);
        throw error;
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );

  return useMutation({ mutationFn });
};
