import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

export const useMutationQuery = (apiUrl: string, queryKey: string) => {
  const queryClient = useQueryClient();
  const { axios } = CONTEXT_HOOKS.useAxiosContext();
  const axiosResponseValidator = APP_HOOKS.useAxiosResponseValidator();

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
