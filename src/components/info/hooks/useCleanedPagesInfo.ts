import React from "react";
import ContextHooks from "../../../providers/0_ContextHooks";
import { AppNav, AppNavCategory, AppNavNode } from "../../../types";
import { PagesInfo } from "../constants";
import { PageInfo } from "../types";

export const useCleanedPagesInfo = (): PageInfo[] => {
  const { nav } = ContextHooks.useCleanedNavigationContext();
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
      PagesInfo.filter(({ appRoute: pageInfoAppRoute }) =>
        navNodes.some(({ appRoute }) => appRoute === pageInfoAppRoute)
      ),
    [navNodes]
  );
};
