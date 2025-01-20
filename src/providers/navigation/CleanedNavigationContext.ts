import React from "react";
import { AppNav, AppNavNode } from "../../types";

interface CleanedNavValue {
  nav: AppNav[];
  currentNavNode: AppNavNode | null;
}

export const CleanedNavigationContext = React.createContext<CleanedNavValue>({
  nav: [],
  currentNavNode: null,
});
