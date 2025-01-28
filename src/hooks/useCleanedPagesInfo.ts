import React from "react";
import { AppNav, AppNavCategory, AppNavNode, PageInfo } from "../types";
import CONTEXT_HOOKS from "../providers/0_ContextHooks";
import APP_CONSTANTS from "../constants/AppConstants";

export type UseCleanedPagesInfo = () => PageInfo[];

export const useCleanedPagesInfo: UseCleanedPagesInfo = () => {
  const { nav } = CONTEXT_HOOKS.useCleanedNavigationContext();
  const navNodes = React.useMemo<AppNavNode[]>(
    () =>
      nav.reduce((allNodes: AppNavNode[], navItem: AppNav) => {
        // For each AppNav, get all nodes from its categories
        const nodesFromCategories = navItem.categories.reduce(
          (categoryNodes: AppNavNode[], category: AppNavCategory) => {
            // Add all children nodes from current category
            return [...categoryNodes, ...category.children];
          },
          []
        );

        // Combine with previously accumulated nodes
        return [...allNodes, ...nodesFromCategories];
      }, []),
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
