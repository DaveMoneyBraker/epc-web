import React from "react";
import {
  AppNavigationSection,
  AppNavigationCategory,
  AppNavigationNode,
  PageInfo,
} from "../types";
import CONTEXT_HOOKS from "../providers/0_ContextHooks";
import APP_CONSTANTS from "../constants/0_AppConstants";

export type UseCleanedPagesInfo = () => PageInfo[];

export const useCleanedPagesInfo: UseCleanedPagesInfo = () => {
  const { navigation: nav } = CONTEXT_HOOKS.useCleanedNavigationContext();
  const navNodes = React.useMemo<AppNavigationNode[]>(
    () =>
      nav.reduce(
        (allNodes: AppNavigationNode[], navItem: AppNavigationSection) => {
          // For each AppNav, get all nodes from its categories
          const nodesFromCategories = navItem.categories.reduce(
            (
              categoryNodes: AppNavigationNode[],
              category: AppNavigationCategory
            ) => {
              // Add all children nodes from current category
              return [...categoryNodes, ...category.children];
            },
            []
          );

          // Combine with previously accumulated nodes
          return [...allNodes, ...nodesFromCategories];
        },
        []
      ),
    [nav]
  );

  return React.useMemo(
    () =>
      APP_CONSTANTS.PAGES_INFO.filter(({ appRoute: pageInfoAppRoute }) =>
        navNodes.some(({ appRoute }) => appRoute === pageInfoAppRoute)
      ),
    [navNodes]
  );
};
