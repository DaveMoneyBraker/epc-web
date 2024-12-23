import React from "react";
import { AppNav, AppNavNode } from "../../core/router/nav";

interface CleanedNavValue {
  nav: AppNav[];
  currentNavNode: AppNavNode | null;
}

export const CleanedNavigationContext = React.createContext<CleanedNavValue>({
  nav: [],
  currentNavNode: null,
});
