import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosContext } from "../axios";
import { AccountContext } from "./AccountContext";
import {
  AccountData,
  ChildrenProps,
  User,
  UserPermission,
  UserRoles,
} from "../../types";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes } from "../../core/router";

export const AccountProvider: React.FC<ChildrenProps> = ({ children }) => {
  const inApp = AppHooks.useInApp();
  const { axios } = useAxiosContext();

  const userEnabled = React.useMemo(
    () => Boolean(inApp && axios),
    [inApp, axios]
  );

  const { data: user } = useQuery<User>({
    queryKey: ["accountUser"],
    queryFn: async () => {
      const response = await axios?.get<User>(ApiRoutes.CURRENT_USER);
      if (response && response.data) {
        return response.data as any;
      } else if (!response) {
        throw new Error("No Current User Server Response");
      }
    },
    enabled: userEnabled,
  });

  const { data: roles } = useQuery<UserRoles[]>({
    queryKey: ["userRoles"],
    queryFn: async () => {
      const response = await axios?.get<{ roles: UserRoles[] }>(
        ApiRoutes.CURRENT_USER_ROLES
      );
      if (response && response.data && response.data.roles) {
        const {
          data: { roles },
        } = response;
        return roles as any;
      } else if (!response) {
        throw new Error("No User Roles Server Response");
      }
    },
    enabled: Boolean(user?.id),
  });

  const { data: permissions } = useQuery<UserPermission[][]>({
    queryKey: ["accountPermissions"],
    queryFn: async () => {
      const response = await axios?.get<{ permissions: UserPermission[][] }>(
        ApiRoutes.CURRENT_USER_PERMISSIONS
      );
      if (response && response.data) {
        return response.data.permissions as any;
      } else if (!response) {
        throw new Error("No User Permissions Server Response");
      }
    },
    enabled: Boolean(roles?.length),
  });

  const value: AccountData = React.useMemo(() => {
    return {
      user,
      permissions: permissions ? permissions.flat(1) : permissions,
      roles,
    };
  }, [user, permissions, roles]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
