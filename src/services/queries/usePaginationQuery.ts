import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationResponse, QueryProps } from "../../types";
import { useAxiosContext } from "../../providers/axios";
import AppUtils from "../../utils/0_AppUtils";
import APP_CONSTANTS from "../../constants/AppConstants";

export const usePaginationQuery = <T = unknown>(props: QueryProps<T>) => {
  const {
    queryKey,
    apiUrl,
    query,
    enabled = true,
    options: { transform, onSuccess, onError } = {},
  } = props;
  const { axios } = useAxiosContext();
  const client = useQueryClient();
  const isEnabled = React.useMemo(() => (enabled ? true : false), [enabled]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  const queryFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }
    try {
      const response = await axios?.get<PaginationResponse<T>>(apiUrl + query);
      const errorMessage = AppUtils.getAxiosResponseError(response, ["items"]);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const { items, totalItems: total } = response?.data;

      if (!Array.isArray(items)) {
        throw new Error(APP_CONSTANTS.APP_ERRORS.INVALID_ITEMS_FORMAT);
      }

      setTotalItems(total);
      onSuccess && onSuccess(items);
      return items;
    } catch (error: any) {
      console.error("Pagination query error:", error);
      onError && onError(error);
      throw error;
    }
  }, [apiUrl, query, axios, onSuccess, onError]);

  const data = useQuery<T[]>({
    queryKey: [queryKey],
    queryFn: queryFn,
    initialData: [],
    enabled: isEnabled,
    retry: 1,
    staleTime: 500,
    select: transform,
  });

  React.useEffect(() => {
    if (!data.isLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [data.isLoading, isInitialLoad]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      client.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [query, queryKey, client]);

  return { ...data, totalItems, isInitialLoad };
};
