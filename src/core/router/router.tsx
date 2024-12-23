import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useAppNav } from "./nav";
import { AppRoutes } from "./appRoutes";
import AppUtils from "../../utils/0_AppUtils";
import { ConfigureProviders } from "../../providers/ConfigureProviders";
import { Layout } from "../../components/0_layout";

export const useAppRouter = () => {
  const appNav = useAppNav();

  const LoginPage = React.lazy(() => import("../../pages/login/LoginPage"));

  return createBrowserRouter([
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
          element: <Navigate to={AppRoutes.LOGIN} />,
        },
      ],
    },
  ]);
};
