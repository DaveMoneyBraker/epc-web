import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNav, AppNavNode, ChildrenProps } from "../../types";
import { AppRoutes } from "../../core/router";
import { useCleanedNavigationContext } from "../navigation";

const DEFAULT_ROUTES = ["/", "/pages", "/pages/"];

export const RoutesGuardProvider: React.FC<ChildrenProps> = ({ children }) => {
  // TODO - IMPLEMENT WAITING FOR ACCOUNT DATA LOADING
  const navigate = useNavigate();
  const location = useLocation();
  const { forbiddenRoutes, nav }: { forbiddenRoutes: string[]; nav: AppNav[] } =
    useCleanedNavigationContext();

  // Get a random accessible navigation node
  const getRandomNavNode = React.useCallback((): AppNavNode | null => {
    const accessibleNodes: AppNavNode[] = [];

    nav.forEach((section) => {
      section.categories.forEach((category) => {
        category.children.forEach((node) => {
          if (!forbiddenRoutes.includes(node.appRoute)) {
            accessibleNodes.push(node);
          }
        });
      });
    });

    if (accessibleNodes.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * accessibleNodes.length);
    return accessibleNodes[randomIndex];
  }, [nav, forbiddenRoutes]);

  // Handle routing logic
  React.useEffect(() => {
    const { pathname } = location;

    // Check if current route is forbidden
    if (forbiddenRoutes.some((route) => pathname.includes(route))) {
      // TODO - IMPLEMENT NOT-FOUND PAGE
      console.log("Access denied: Redirecting to login", { pathname });
      navigate(AppRoutes.LOGIN);
      return;
    }

    // Handle default routes redirection
    if (DEFAULT_ROUTES.includes(pathname)) {
      const randomNode = getRandomNavNode();

      if (randomNode) {
        console.log("Redirecting to random accessible route", {
          from: pathname,
          to: randomNode.appRoute,
        });
        navigate(randomNode.appRoute);
      } else {
        console.log("No accessible routes found, redirecting to login");
        navigate(AppRoutes.LOGIN);
      }
    }
  }, [location, navigate, forbiddenRoutes, getRandomNavNode]);

  // DEBUG CONSOLE LOG
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.group("RoutesGuardProvider Debug");
      console.log("Current Path:", location.pathname);
      console.log("Forbidden Routes:", forbiddenRoutes);
      console.log("Available Navigation:", nav);
      console.groupEnd();
    }
  }, [location.pathname, forbiddenRoutes, nav]);
  return <>{children}</>;
};
