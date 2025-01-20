import React from "react";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { useAppNav } from "./nav";
import { AppRoutes } from "./appRoutes";
import AppUtils from "../../utils/0_AppUtils";
import { ConfigureProviders } from "../../providers/ConfigureProviders";
import { Layout } from "../../components/0_layout";

// Helper function to add index redirects to parent routes
const addIndexRedirects = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    if (route.children?.length) {
      // Find the first valid child route path
      const firstChildPath = route.children.find(
        (child) => child.path && !child.path.includes("*")
      )?.path;

      // Add index redirect if there's a valid child path
      if (firstChildPath) {
        return {
          ...route,
          children: [
            // Add index route that redirects to first child
            {
              index: true,
              element: <Navigate to={firstChildPath} replace />,
            },
            // Recursively process nested children
            ...addIndexRedirects(route.children),
          ],
        };
      }

      // If no valid child path, just process children recursively
      return {
        ...route,
        children: addIndexRedirects(route.children),
      };
    }
    return route;
  });
};

export const useAppRouter = () => {
  const appNav = useAppNav();

  // LOGIN PAGE
  const LoginPage = React.lazy(() => import("../../pages/login/LoginPage"));

  // NOT FOUND PAGE
  const NotFoundPage = React.lazy(
    () => import("../../pages/notFound/NotFoundPage")
  );

  return createBrowserRouter(
    addIndexRedirects([
      // MAIN APP
      {
        path: "/",
        element: <ConfigureProviders />,
        children: [
          {
            path: "pages",
            element: <Layout />,
            children: [
              ...appNav.map((nav) => {
                const { categories, path } = nav;
                const navNodes = categories.map(({ children }) => children);
                return {
                  path,
                  children: navNodes.flat(1).map(({ appRoute, element }) => ({
                    path: AppUtils.getLastPartOfString(appRoute),
                    element,
                  })),
                };
              }),
              // NOT FOUND
              {
                path: AppRoutes.NOT_FOUND,
                element: (
                  <React.Suspense>
                    <NotFoundPage />
                  </React.Suspense>
                ),
              },
            ],
          },
          // AUTH
          {
            path: "auth",
            children: [
              {
                path: "login",
                index: true,
                element: (
                  <React.Suspense>
                    <LoginPage />
                  </React.Suspense>
                ),
              },
            ],
          },
          // NOT FOUND

          {
            path: "*",
            element: <Navigate to={AppRoutes.NOT_FOUND} />,
          },
        ],
      },
    ])
  );
};
