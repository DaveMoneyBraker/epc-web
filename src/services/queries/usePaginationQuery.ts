import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationResponse, QueryProps } from "../../types";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppResponseValidators from "../../validators/response/0_ResponseValidators";
import APP_HOOKS from "../../hooks/0_AppHooks";
import ContextHooks from "../../providers/0_ContextHooks";

export const usePaginationQuery = <T = unknown>(props: QueryProps<T>) => {
  const {
    queryKey,
    apiUrl,
    query,
    enabled = true,
    options: { transform, onSuccess, onError } = {},
  } = props;
  const client = useQueryClient();
  const { axios } = ContextHooks.useAxiosContext();
  const axiosResponseValidator = APP_HOOKS.useAxiosResponseValidator();
  const isEnabled = React.useMemo(() => (enabled ? true : false), [enabled]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  const queryFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }
    try {
      const response = await axios?.get<PaginationResponse<T>>(apiUrl + query);
      const errorMessage = axiosResponseValidator(response, [
        AppResponseValidators.validatePaginationResponse,
      ]);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const { items, totalItems: total } = response?.data;

      setTotalItems(total);
      onSuccess && onSuccess(items);
      return items;
    } catch (error: any) {
      console.error("Pagination query error:", error);
      onError && onError(error);
      throw error;
    }
  }, [axios, apiUrl, query, axiosResponseValidator, onSuccess, onError]);

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
