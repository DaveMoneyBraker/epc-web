import React from "react";
import { DefaultPageActions } from "../types";
import { useCleanedNavigationContext } from "../providers/navigation";
import { useAccountContext } from "../providers/account/useAccountContext";

export const useFilteredByPermissionsActions = (
  actions: DefaultPageActions[]
): DefaultPageActions[] => {
  const { currentNavNode } = useCleanedNavigationContext();
  const currentNavNodePermissionRoute = React.useMemo(
    () => currentNavNode?.permissionsRoute || null,
    [currentNavNode]
  );
  const { permissions } = useAccountContext();
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
  }, [requestedRouteUserPermissions, actions]);
};
