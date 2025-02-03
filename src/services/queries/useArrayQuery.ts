import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryProps } from "../../types";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

export const useArrayQuery = <T = unknown>(
  props: Omit<QueryProps<T>, "query">
) => {
  const {
    queryKey,
    apiUrl,
    enabled = true,
    options: { transform, onSuccess, onError } = {},
  } = props;
  const client = useQueryClient();
  const { axios } = CONTEXT_HOOKS.useAxiosContext();
  const axiosResponseValidator = APP_HOOKS.useAxiosResponseValidator();
  const isEnabled = React.useMemo(
    () => Boolean(queryKey) && Boolean(apiUrl) && enabled,
    [apiUrl, enabled, queryKey]
  );
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  const queryFn = React.useCallback(async () => {
    if (!axios) {
      throw new Error(APP_CONSTANTS.APP_ERRORS.NO_AXIOS_INSTANCE);
    }
    try {
      const response = await axios?.get<T[]>(apiUrl);
      const errorMessage = axiosResponseValidator(response);

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      onSuccess && onSuccess(response?.data);
      return response?.data;
    } catch (error: any) {
      console.error("Array query error:", error);
      onError && onError(error);
      throw error;
    }
  }, [axios, apiUrl, axiosResponseValidator, onSuccess, onError]);

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
  }, [queryKey, client]);

  return { ...data, isInitialLoad };
};
