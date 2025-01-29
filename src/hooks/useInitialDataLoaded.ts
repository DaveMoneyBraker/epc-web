import React from "react";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { useInApp } from "./useInApp";
import APP_CONSTANTS from "../constants/0_AppConstants";

export type UseInitialDataLoaded = () => boolean;

export const useInitialDataLoaded: UseInitialDataLoaded = () => {
  const inApp = useInApp();
  const queryClient = useQueryClient();
  const accountUserState = queryClient.getQueryState([
    APP_CONSTANTS.QUERY_KEYS.USER,
  ]) as QueryState;
  const userRolesState = queryClient.getQueryState([
    APP_CONSTANTS.QUERY_KEYS.ROLES,
  ]) as QueryState;
  const accountPermissionsState = queryClient.getQueryState([
    APP_CONSTANTS.QUERY_KEYS.PERMISSIONS,
  ]) as QueryState;

  const isQueryStateLoaded = React.useCallback(
    (state: QueryState): boolean =>
      Boolean(state && state.fetchStatus !== "fetching" && state.data),
    []
  );

  // Check if account data is loading by examining query states
  return React.useMemo(
    () =>
      inApp &&
      isQueryStateLoaded(accountUserState) &&
      isQueryStateLoaded(userRolesState) &&
      isQueryStateLoaded(accountPermissionsState),
    [
      inApp,
      accountUserState,
      userRolesState,
      accountPermissionsState,
      isQueryStateLoaded,
    ]
  );
};
