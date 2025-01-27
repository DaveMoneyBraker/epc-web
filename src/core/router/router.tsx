import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useAppNav } from "./nav";
import AppUtils from "../../utils/0_AppUtils";
import { ConfigureProviders } from "../../providers/ConfigureProviders";
import { Layout } from "../../components/0_layout";
import APP_CONSTANTS from "../../constants/AppConstants";

export const useAppRouter = () => {
  const appNav = useAppNav();

  // LOGIN PAGE
  const LoginPage = React.lazy(() => import("../../pages/login/LoginPage"));

  // NOT FOUND PAGE
  const NotFoundPage = React.lazy(
    () => import("../../pages/notFound/NotFoundPage")
  );

  return React.useMemo(
    () =>
      createBrowserRouter(
        AppUtils.addIndexRedirects([
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
                      children: navNodes
                        .flat(1)
                        .map(({ appRoute, element }) => ({
                          path: AppUtils.getLastPartOfString(appRoute),
                          element,
                        })),
                    };
                  }),
                  // NOT FOUND
                  {
                    path: APP_CONSTANTS.APP_ROUTES.NOT_FOUND,
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
                element: <Navigate to={APP_CONSTANTS.APP_ROUTES.NOT_FOUND} />,
              },
            ],
          },
        ])
      ),
    [LoginPage, NotFoundPage, appNav]
  );
};
