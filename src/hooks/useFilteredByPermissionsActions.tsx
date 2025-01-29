import React from "react";
import { DefaultPageActions } from "../types";
import APP_HOOKS from "./0_AppHooks";
import CONTEXT_HOOKS from "../providers/0_ContextHooks";
import APP_CONSTANTS from "../constants/0_AppConstants";

export type UseFilteredByPermissionsActions = (
  actions: DefaultPageActions[]
) => DefaultPageActions[];

export const useFilteredByPermissionsActions: UseFilteredByPermissionsActions =
  (actions: DefaultPageActions[]) => {
    const { currentNavNode } = CONTEXT_HOOKS.useCleanedNavigationContext();
    const { permissions } = CONTEXT_HOOKS.useAccountContext();
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
        actions.some((a) => a === APP_CONSTANTS.PAGE_ACTIONS.CREATE) &&
        requestedRouteUserPermissions?.some(
          (rq) => rq[2] === APP_CONSTANTS.PAGE_ACTIONS.CREATE
        )
      ) {
        filteredActions.push(APP_CONSTANTS.PAGE_ACTIONS.CREATE);
      }
      if (
        actions.some((a) => a === APP_CONSTANTS.PAGE_ACTIONS.EDIT) &&
        requestedRouteUserPermissions?.some((rq) => rq[2] === "update")
      ) {
        filteredActions.push(APP_CONSTANTS.PAGE_ACTIONS.EDIT);
      }
      if (
        actions.some((a) => a === APP_CONSTANTS.PAGE_ACTIONS.DELETE) &&
        requestedRouteUserPermissions?.some(
          (rq) => rq[2] === APP_CONSTANTS.PAGE_ACTIONS.DELETE
        )
      ) {
        filteredActions.push(APP_CONSTANTS.PAGE_ACTIONS.DELETE);
      }
      if (
        actions.some((a) => a === APP_CONSTANTS.PAGE_ACTIONS.SUBMIT) &&
        requestedRouteUserPermissions?.some((rq) => rq[1].endsWith("file"))
      ) {
        filteredActions.push(APP_CONSTANTS.PAGE_ACTIONS.SUBMIT);
      }
      return filteredActions;
    }, [requestedRouteUserPermissions, actions, isAdmin]);
  };
