import React from "react";
import { PermissionRoutes, PermissionRoute } from "./permissionRoutes";
import { ApiRoutes } from "./apiRoutes";
import { AppRoutes } from "./appRoutes";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import APP_CONSTANTS from "../../constants/AppConstants";

export const useAppNav = (): AppNav[] => {
  // SUPPRESSIONS
  const SuppressionsDomainPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionDomainPage")
  );
  const SuppressionsSubmitDomainPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionsSubmitDomainPage")
  );
  const SuppressionsEmailPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionsEmailPage")
  );
  const SuppressionsMxPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionMxPage")
  );
  const SuppressionMaskPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionMaskPage")
  );

  // DNSBL
  const BlacklistDomainsPage = React.lazy(
    () => import("../../pages/dnsbl/BlackListDomainsPage")
  );
  return [
    {
      title: "SUPPRESSION",
      icon: <MarkEmailReadOutlinedIcon />,
      path: "suppression",
      categories: [
        {
          title: "MAIN",
          children: [
            {
              title: "Email",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL,
              apiRoute: ApiRoutes.SUPPRESSION_EMAIL,
              appRoute: AppRoutes.SUPPRESSION_EMAIL,
              permissionsRoute: PermissionRoutes.SUPPRESSION_EMAIL,
              element: (
                <React.Suspense>
                  <SuppressionsEmailPage />
                </React.Suspense>
              ),
            },
            {
              title: "Domain",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN,
              apiRoute: ApiRoutes.SUPPRESSION_DOMAIN,
              appRoute: AppRoutes.SUPPRESSION_DOMAIN,
              permissionsRoute: PermissionRoutes.SUPPRESSION_DOMAIN,
              element: (
                <React.Suspense>
                  <SuppressionsDomainPage />
                </React.Suspense>
              ),
            },
            {
              title: "Submit Suppressions Domain",
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN}`,
              apiRoute: ApiRoutes.SUPPRESSION_DOMAIN + "-submit",
              appRoute: AppRoutes.SUPPRESSION_DOMAIN + "-submit",
              permissionsRoute: PermissionRoutes.SUPPRESSION_DOMAIN,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitDomainPage />
                </React.Suspense>
              ),
            },
            {
              title: "Mx",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX,
              apiRoute: ApiRoutes.SUPPRESSION_MX,
              appRoute: AppRoutes.SUPPRESSION_MX,
              permissionsRoute: PermissionRoutes.SUPPRESSION_MX,
              element: (
                <React.Suspense>
                  <SuppressionsMxPage />
                </React.Suspense>
              ),
            },
            {
              title: "Mask",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MASK,
              apiRoute: ApiRoutes.SUPPRESSION_MASK,
              appRoute: AppRoutes.SUPPRESSION_MASK,
              permissionsRoute: PermissionRoutes.SUPPRESSION_MASK,
              element: (
                <React.Suspense>
                  <SuppressionMaskPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      title: "DOMAIN LOOKUP",
      icon: <ChecklistRtlIcon />,
      path: "dnsbl",
      categories: [
        {
          title: "BLACKLIST CHECK",
          children: [
            {
              title: "Blacklist Domains",
              pageTitle: "Blacklist Domains",
              apiRoute: ApiRoutes.BLACKLIST_DOMAINS,
              appRoute: AppRoutes.BLACKLIST_DOMAINS,
              permissionsRoute: PermissionRoutes.SUPPRESSION_EMAIL,
              element: (
                <React.Suspense>
                  <BlacklistDomainsPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
  ];
};

export interface AppNav {
  title: string;
  icon: React.ReactNode;
  path: string;
  categories: AppNavCategory[];
}

export interface AppNavCategory {
  title: string;
  children: AppNavNode[];
}

export interface AppNavNode {
  title: string;
  pageTitle: string;
  appRoute: string;
  apiRoute: string;
  permissionsRoute: PermissionRoute;
  element: React.ReactNode;
}
