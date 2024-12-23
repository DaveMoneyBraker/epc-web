import React from "react";
import { CleanedNavigationContext } from "./CleanedNavigationContext";

export const useCleanedNavigationContext = () => {
  const value = React.useContext(CleanedNavigationContext);
  if (!value) {
    throw new Error(
      "useCleanedNavigationContext used outside of CleanedNavigationContext"
    );
  }
  return value;
};
