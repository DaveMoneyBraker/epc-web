import React from "react";
import { CleanedNavigationContext } from "./CleanedNavigationContext";
import { useAccountContext } from "../account/useAccountContext";
import { useLocation } from "react-router-dom";
import {
  ChildrenProps,
  NavigationState,
  CurrentNavigation,
  AppNavigationSection,
  AppNavigationCategory,
  AppNavigationNode,
} from "../../types";
import { useAppNav } from "../../core/router/nav";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

export const CleanedNavigationProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const location = useLocation();
  const appNav = useAppNav();
  const { permissions } = useAccountContext();
  const isAdmin = APP_HOOKS.useIsAdmin();

  const currentNavigation = React.useMemo<CurrentNavigation | null>(() => {
    let cn: CurrentNavigation | null = null;
    appNav.forEach((section) =>
      section.categories.forEach((category) =>
        category.children.forEach((node) => {
          if (location.pathname.includes(node.appRoute)) {
            cn = {
              section,
              category,
              node,
            };
          }
        })
      )
    );
    return cn;
  }, [appNav, location]);

  const navigationState = React.useMemo<NavigationState>(() => {
    if (isAdmin) {
      return {
        navigation: appNav,
        currentNavigation,
        forbiddenRoutes: [],
      };
    }

    if (permissions && permissions.length) {
      const cleanedNav: AppNavigationSection[] = [];
      const forbiddenRoutes: string[] = [];

      appNav.forEach((nav) => {
        const { categories } = nav;
        const cleanedCategories: AppNavigationCategory[] = [];

        categories.forEach((category) => {
          const { children } = category;

          // Separate permitted and forbidden nodes
          const { allowed, forbidden } = children.reduce<{
            allowed: AppNavigationNode[];
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
        navigation: cleanedNav,
        currentNavigation,
        forbiddenRoutes,
      };
    }

    return {
      navigation: appNav.filter((nav) => nav.freeAccess),
      currentNavigation,
      forbiddenRoutes: [],
    };
  }, [isAdmin, permissions, currentNavigation, appNav]);

  const value = React.useMemo(
    () => ({
      navigation: navigationState.navigation,
      currentNavigation: navigationState.currentNavigation,
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
