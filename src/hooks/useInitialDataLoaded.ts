import React from "react";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { useInApp } from "./useInApp";

export const useInitialDataLoaded = (): boolean => {
  const inApp = useInApp();
  const queryClient = useQueryClient();
  const accountUserState = queryClient.getQueryState([
    "accountUser",
  ]) as QueryState;
  const userRolesState = queryClient.getQueryState(["userRoles"]) as QueryState;
  const accountPermissionsState = queryClient.getQueryState([
    "accountPermissions",
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
