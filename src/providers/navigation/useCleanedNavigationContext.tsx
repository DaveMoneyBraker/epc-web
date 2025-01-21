import React from "react";
import { CleanedNavigationContext } from "./CleanedNavigationContext";
import { NavigationState } from "../../types";

export const useCleanedNavigationContext = (): NavigationState => {
  const value = React.useContext(CleanedNavigationContext);
  if (!value) {
    throw new Error(
      "useCleanedNavigationContext used outside of CleanedNavigationContext"
    );
  }
  return value;
};
