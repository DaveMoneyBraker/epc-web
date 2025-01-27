import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";
import ContextHooks from "../../providers/0_ContextHooks";

export const useMutationQuery = (apiUrl: string, queryKey: string) => {
  const queryClient = useQueryClient();
  const { axios } = ContextHooks.useAxiosContext();
  const axiosResponseValidator = AppHooks.useAxiosResponseValidator();

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
        const errorMessage = axiosResponseValidator(response);

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
    [axios, apiUrl, axiosResponseValidator, queryClient, queryKey]
  );

  return useMutation({ mutationFn });
};
