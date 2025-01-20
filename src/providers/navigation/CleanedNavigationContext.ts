import React from "react";
import { NavigationState } from "../../types";

export const CleanedNavigationContext = React.createContext<NavigationState>({
  nav: [],
  currentNavNode: null,
  forbiddenNodes: [],
});
