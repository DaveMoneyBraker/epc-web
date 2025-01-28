import React from "react";
import CONTEXT_HOOKS from "../providers/0_ContextHooks";

export type UseUserFullName = () => string;

export const useUserFullName: UseUserFullName = () => {
  const { user } = CONTEXT_HOOKS.useAccountContext();
  return React.useMemo(() => {
    if (!user) {
      return "loading...";
    }
    const { firstName, lastName } = user;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (!firstName || !lastName) {
      return firstName || lastName;
    }
    return "no user found";
  }, [user]);
};
