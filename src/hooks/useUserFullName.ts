import React from "react";
import { useAccountContext } from "../providers/account/useAccountContext";

export const useUserFullName = (): string => {
  const { user } = useAccountContext();
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
