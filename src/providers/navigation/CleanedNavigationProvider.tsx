import React from "react";
import { CleanedNavigationContext } from "./CleanedNavigationContext";
import { useAccountContext } from "../account/useAccountContext";
import { useLocation } from "react-router-dom";
import { ChildrenProps } from "../../types";
import { AppNav, AppNavCategory, useAppNav } from "../../core/router/nav";
import APP_CONSTANTS from "../../constants/AppConstants";

export const CleanedNavigationProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const location = useLocation();
  const appNav = useAppNav();
  const { permissions } = useAccountContext();

  const nav = React.useMemo(() => {
    if (permissions && permissions.length) {
      const cleanedNav: AppNav[] = [];
      appNav.forEach((nav) => {
        const { categories } = nav;
        const cleanedCategories: AppNavCategory[] = [];
        categories.forEach((category) => {
          const { children } = category;
          const cleanedChildren = children.filter(({ permissionsRoute }) =>
            permissions.some(
              ([, r, a]) =>
                r === permissionsRoute.default &&
                a === APP_CONSTANTS.PERMISSION_ACTIONS.CREATE
            )
          );
          if (cleanedChildren && cleanedChildren.length) {
            cleanedCategories.push({ ...category, children: cleanedChildren });
          }
        });
        if (cleanedCategories && cleanedCategories.length) {
          cleanedNav.push({ ...nav, categories: cleanedCategories });
        }
      });
      return cleanedNav;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions]);

  const currentNavNode = React.useMemo(() => {
    let cn = null;
    nav.forEach((n) =>
      n.categories.forEach((c) =>
        c.children.forEach((child) => {
          if (location.pathname.includes(child.appRoute)) {
            cn = child;
          }
        })
      )
    );
    return cn;
  }, [nav, location]);

  const value = React.useMemo(
    () => ({ nav, currentNavNode }),
    [nav, currentNavNode]
  );

  return (
    <CleanedNavigationContext.Provider value={value}>
      {children}
    </CleanedNavigationContext.Provider>
  );
};
