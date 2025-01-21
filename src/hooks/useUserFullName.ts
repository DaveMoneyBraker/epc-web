import React from "react";
import ContextHooks from "../providers/0_ContextHooks";

export const useUserFullName = (): string => {
  const { user } = ContextHooks.useAccountContext();
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
