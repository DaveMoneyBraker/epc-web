import React from "react";
import { DefaultPageActions } from "../types";
import APP_HOOKS from "./0_AppHooks";
import ContextHooks from "../providers/0_ContextHooks";

export type UseFilteredByPermissionsActions = (
  actions: DefaultPageActions[]
) => DefaultPageActions[];

export const useFilteredByPermissionsActions: UseFilteredByPermissionsActions =
  (actions: DefaultPageActions[]) => {
    const { currentNavNode } = ContextHooks.useCleanedNavigationContext();
    const { permissions } = ContextHooks.useAccountContext();
    const isAdmin = APP_HOOKS.useIsAdmin();
    const currentNavNodePermissionRoute = React.useMemo(
      () => currentNavNode?.permissionsRoute || null,
      [currentNavNode]
    );
    const requestedRouteUserPermissions = React.useMemo(
      () =>
        permissions?.filter((permission) =>
          permission[1].includes(
            currentNavNodePermissionRoute?.default ||
              currentNavNodePermissionRoute?.file ||
              "costyl"
          )
        ),
      [permissions, currentNavNodePermissionRoute]
    );

    return React.useMemo(() => {
      if (isAdmin) return actions;
      const filteredActions: DefaultPageActions[] = [];
      if (requestedRouteUserPermissions?.some((v) => v[0] === "admin")) {
        return [...actions];
      }
      if (
        actions.some((a) => a === "create") &&
        requestedRouteUserPermissions?.some((rq) => rq[2] === "create")
      ) {
        filteredActions.push("create");
      }
      if (
        actions.some((a) => a === "edit") &&
        requestedRouteUserPermissions?.some((rq) => rq[2] === "update")
      ) {
        filteredActions.push("edit");
      }
      if (
        actions.some((a) => a === "delete") &&
        requestedRouteUserPermissions?.some((rq) => rq[2] === "delete")
      ) {
        filteredActions.push("delete");
      }
      if (
        actions.some((a) => a === "submit") &&
        requestedRouteUserPermissions?.some((rq) => rq[1].endsWith("file"))
      ) {
        filteredActions.push("submit");
      }
      return filteredActions;
    }, [requestedRouteUserPermissions, actions, isAdmin]);
  };
