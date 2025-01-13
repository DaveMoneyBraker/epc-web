import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosContext } from "../../../providers/axios";
import { QueueResponse } from "../types";

export const useQueueQuery = (
  apiUrl: string,
  status: string,
  page: number,
  queryKey: string
) => {
  const { axios } = useAxiosContext();
  const client = useQueryClient();

  const queryFn = React.useCallback(async (): Promise<QueueResponse | null> => {
    if (apiUrl && apiUrl.includes("?")) {
      const url = `${apiUrl}&status=${status}&page=${page + 1}`;
      const response = await axios?.get<{ body: QueueResponse }>(url);
      if (response) {
        const {
          data: { body },
        } = response;
        return body;
      } else if (!response) {
        throw new Error("No Server Response");
      }
    }
    return null;
  }, [apiUrl, status, page, axios]);

  const data = useQuery<QueueResponse | null>({
    queryKey: [queryKey],
    retry: 1,
    queryFn,
    initialData: null,
  });

  React.useEffect(() => {
    client.invalidateQueries({ queryKey: [queryKey] });
  }, [apiUrl, status, page, client, queryKey]);

  return { ...data, client };
};
