import React from "react";
import { useAccountContext } from "../providers/account/useAccountContext";
import APP_CONSTANTS from "../constants/AppConstants";

export const useIsAdmin = (): boolean => {
  const { roles } = useAccountContext();
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
