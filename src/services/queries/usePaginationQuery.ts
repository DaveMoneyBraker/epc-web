import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationResponse } from "../../types";
import { useAxiosContext } from "../../providers/axios";

interface Props {
  apiUrl: string;
  queryKey: string;
  query: string;
  enabled?: any;
}

export const usePaginationQuery = <T = unknown>(props: Props) => {
  const { queryKey, apiUrl, query, enabled = true } = props;
  const { axios } = useAxiosContext();
  const client = useQueryClient();
  const isEnabled = React.useMemo(() => (enabled ? true : false), [enabled]);
  const [totalItems, setTotalItems] = React.useState(0);

  const queryFn = React.useCallback(async () => {
    const response = await axios?.get<PaginationResponse<T>>(apiUrl + query);
    if (response) {
      const { items, totalItems: total } = response?.data;
      setTotalItems(total);
      return items as any;
    } else if (!response) {
      throw new Error("No Server Response");
    }
  }, [apiUrl, query, axios]);

  const data = useQuery<T[]>({
    queryKey: [queryKey],
    queryFn: queryFn,
    initialData: [],
    enabled: isEnabled,
    retry: 1,
  });

  React.useEffect(() => {
    // SETTIMEOUT FOR PREVENTING INVALIDATION BEFORE queryFn RERENDER
    client.invalidateQueries({ queryKey: [queryKey] });
  }, [query]);

  return { ...data, totalItems };
};
