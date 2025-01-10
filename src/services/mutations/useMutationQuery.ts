import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosContext } from "../../providers/axios";

export const useMutationQuery = (apiUrl: string, queryKey: string) => {
  const { axios } = useAxiosContext();
  const queryClient = useQueryClient();
  const mutationFn = React.useCallback(
    async (input: { body?: any; method: "post" | "delete" | "put" }) => {
      if (axios) {
        const { body = {}, method } = input;
        const url =
          method === "post"
            ? apiUrl
            : apiUrl + "/" + (body as { id: string }).id;
        const res = await axios[method](url, { ...body });
        if (res) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          return res.data;
        }
      }
    },
    [apiUrl, queryKey, axios, queryClient]
  );

  return useMutation({ mutationFn });
};
