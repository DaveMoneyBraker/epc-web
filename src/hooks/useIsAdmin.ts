import React from "react";
import APP_CONSTANTS from "../constants/0_AppConstants";
import CONTEXT_HOOKS from "../providers/0_ContextHooks";

export type UseIsAdmin = () => boolean;

export const useIsAdmin: UseIsAdmin = () => {
  const { roles } = CONTEXT_HOOKS.useAccountContext();
  return React.useMemo(
    () =>
      Boolean(
        roles !== undefined &&
          roles.some(
            (role) =>
              role === APP_CONSTANTS.DEFAULT_USER_ROLES.ADMIN ||
              role === APP_CONSTANTS.DEFAULT_USER_ROLES.DEVELOPER
          )
      ),
    [roles]
  );
};
