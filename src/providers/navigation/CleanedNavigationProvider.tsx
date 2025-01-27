import React from "react";
import { CleanedNavigationContext } from "./CleanedNavigationContext";
import { useAccountContext } from "../account/useAccountContext";
import { useLocation } from "react-router-dom";
import {
  AppNav,
  AppNavCategory,
  AppNavNode,
  ChildrenProps,
  NavigationState,
} from "../../types";
import { useAppNav } from "../../core/router/nav";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

export const CleanedNavigationProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const location = useLocation();
  const appNav = useAppNav();
  const { permissions } = useAccountContext();
  const isAdmin = AppHooks.useIsAdmin();

  const currentNavNode = React.useMemo(() => {
    let cn = null;
    appNav.forEach((n) =>
      n.categories.forEach((c) =>
        c.children.forEach((child) => {
          if (location.pathname.includes(child.appRoute)) {
            cn = child;
          }
        })
      )
    );
    return cn;
  }, [appNav, location]);

  const navigationState = React.useMemo<NavigationState>(() => {
    if (isAdmin) {
      return {
        nav: appNav,
        currentNavNode,
        forbiddenRoutes: [],
      };
    }

    if (permissions && permissions.length) {
      const cleanedNav: AppNav[] = [];
      const forbiddenRoutes: string[] = [];

      appNav.forEach((nav) => {
        const { categories } = nav;
        const cleanedCategories: AppNavCategory[] = [];

        categories.forEach((category) => {
          const { children } = category;

          // Separate permitted and forbidden nodes
          const { allowed, forbidden } = children.reduce<{
            allowed: AppNavNode[];
            forbidden: string[];
          }>(
            (acc, child) => {
              const hasPermission = permissions.some(
                ([, route, action]) =>
                  child.permissionsRoute.default ===
                    APP_CONSTANTS.PERMISSION_ROUTES.ALLOW_ALL.default ||
                  (route === child.permissionsRoute.default &&
                    action === APP_CONSTANTS.PERMISSION_ACTIONS.READ)
              );

              if (hasPermission) {
                acc.allowed.push(child);
              } else {
                acc.forbidden.push(child.appRoute);
              }
              return acc;
            },
            { allowed: [], forbidden: [] }
          );

          // Add forbidden nodes to the collection
          forbiddenRoutes.push(...forbidden);

          // Only add categories with allowed children
          if (allowed.length > 0) {
            cleanedCategories.push({ ...category, children: allowed });
          }
        });

        if (cleanedCategories.length > 0) {
          cleanedNav.push({ ...nav, categories: cleanedCategories });
        }
      });

      return {
        nav: cleanedNav,
        currentNavNode,
        forbiddenRoutes,
      };
    }

    return {
      nav: [],
      currentNavNode,
      forbiddenRoutes: [],
    };
  }, [isAdmin, permissions, currentNavNode, appNav]);

  const value = React.useMemo(
    () => ({
      nav: navigationState.nav,
      currentNavNode: navigationState.currentNavNode,
      forbiddenRoutes: navigationState.forbiddenRoutes,
    }),
    [navigationState]
  );

  return (
    <CleanedNavigationContext.Provider value={value}>
      {children}
    </CleanedNavigationContext.Provider>
  );
};
