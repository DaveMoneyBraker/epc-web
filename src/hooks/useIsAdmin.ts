import React from "react";
import APP_CONSTANTS from "../constants/AppConstants";
import ContextHooks from "../providers/0_ContextHooks";

export const useIsAdmin = (): boolean => {
  const { roles } = ContextHooks.useAccountContext();
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
