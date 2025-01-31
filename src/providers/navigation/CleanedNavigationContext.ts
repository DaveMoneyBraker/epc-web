import React from "react";
import { NavigationState } from "../../types";

export const CleanedNavigationContext = React.createContext<NavigationState>({
  navigation: [],
  currentNavigation: null,
  forbiddenRoutes: [],
});
