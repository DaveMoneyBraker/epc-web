import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosContext } from "../axios";
import { AccountContext } from "./AccountContext";
import { AccountData, ChildrenProps, User, UserPermission } from "../../types";
import AppHooks from "../../hooks/0_AppHooks";
import { ApiRoutes } from "../../core/router";

export const AccountProvider: React.FC<ChildrenProps> = ({ children }) => {
  const inApp = AppHooks.useInApp();
  const { axios } = useAxiosContext();

  const userDisabled = React.useMemo(() => !inApp || !axios, [inApp, axios]);
  const { data: user } = useQuery<User>({
    queryKey: ["accountUser"],
    queryFn: async () => {
      const response = await axios?.get<User>(ApiRoutes.CURRENT_USER);
      if (response) {
        return response.data as any;
      } else if (!response) {
        throw new Error("No Server Response");
      }
    },
    enabled: !userDisabled,
  });

  const permissionsDisabled = React.useMemo(() => !user, [user]);
  const { data: permissions } = useQuery<UserPermission[][]>({
    queryKey: ["accountPermissions"],
    queryFn: async () => {
      const response = await axios?.get<{ permissions: UserPermission[][] }>(
        ApiRoutes.CURRENT_USER_PERMISSIONS
      );
      if (response) {
        return response.data.permissions as any;
      } else if (!response) {
        throw new Error("No Server Response");
      }
    },
    enabled: !permissionsDisabled,
  });

  const value: AccountData = React.useMemo(() => {
    return {
      user,
      permissions: permissions ? permissions.flat(1) : permissions,
    };
  }, [user, permissions]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
