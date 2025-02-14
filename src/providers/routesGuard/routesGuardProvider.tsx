import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNavigationNode, ChildrenProps } from "../../types";
import { useCleanedNavigationContext } from "../navigation";
import APP_HOOKS from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/0_AppConstants";

const DEFAULT_ROUTES = ["/", "/pages", "/pages/"];

export const RoutesGuardProvider: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { forbiddenRoutes, navigation } = useCleanedNavigationContext();
  const initialDataLoaded = APP_HOOKS.useInitialDataLoaded();

  // Get a random accessible navigation node
  const getRandomNavNode = React.useCallback((): AppNavigationNode | null => {
    const accessibleNodes: AppNavigationNode[] = [];

    navigation.forEach((section) => {
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
  }, [navigation, forbiddenRoutes]);

  // Handle routing logic
  React.useEffect(() => {
    // DO NOTHING WHILE WE DON'T HAVE ALL ACCOUNT DATA
    if (!initialDataLoaded) return;
    const { pathname } = location;

    // Check if current route is forbidden
    if (forbiddenRoutes.some((route) => pathname.includes(route))) {
      // TODO - IMPLEMENT NOT-FOUND PAGE
      console.log("Access denied: Redirecting to not found", { pathname });
      navigate(APP_CONSTANTS.APP_ROUTES.NOT_FOUND);
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
        console.log("No accessible routes found, redirecting to Not Found");
        navigate(APP_CONSTANTS.APP_ROUTES.NOT_FOUND);
      }
    }
  }, [
    initialDataLoaded,
    location,
    navigate,
    forbiddenRoutes,
    getRandomNavNode,
  ]);

  // DEBUG CONSOLE LOG
  // React.useEffect(() => {
  //   if (process.env.NODE_ENV === "development") {
  //     console.group("RoutesGuardProvider Debug");
  //     console.log("Current Path:", location.pathname);
  //     console.log("Forbidden Routes:", forbiddenRoutes);
  //     console.log("Available Navigation:", nav);
  //     console.groupEnd();
  //   }
  // }, [location.pathname, forbiddenRoutes, nav]);
  return <React.Fragment>{children}</React.Fragment>;
};
