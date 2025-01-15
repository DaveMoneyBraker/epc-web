import React from "react";
import { PermissionRoutes, PermissionRoute } from "./permissionRoutes";
import { ApiRoutes } from "./apiRoutes";
import { AppRoutes } from "./appRoutes";
import APP_CONSTANTS from "../../constants/AppConstants";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import QueueIcon from "@mui/icons-material/Queue";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { QUEUES } from "../../components/queues";

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
  const SuppressionsSubmitEmailPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionsSubmitEmailPage")
  );
  const SuppressionsMxPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionMxPage")
  );
  const SuppressionsSubmitMxPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionsSubmitMxPage")
  );
  const SuppressionMaskPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionMaskPage")
  );
  const SuppressionSubmitProdFilesPage = React.lazy(
    () => import("../../pages/suppressions/SuppressionsSubmitProdFilesPage")
  );

  // DNSBL
  const BlacklistDomainPage = React.lazy(
    () => import("../../pages/dnsbl/BlackListDomainPage")
  );

  // QUEUES
  const QueuesPage = React.lazy(() => import("../../pages/queues/QueuesPage"));
  const WorkersQueuesNav: AppNav = React.useMemo(() => {
    const categories: AppNavCategory[] = QUEUES.WORKER.map(
      ({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${ApiRoutes.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${AppRoutes.QUEUE}${value}`,
          permissionsRoute: PermissionRoutes.QUEUE,
          element: (
            <React.Suspense>
              <QueuesPage />
            </React.Suspense>
          ),
        })),
      })
    );
    return {
      title: "Workers Queues",
      icon: <QueueIcon />,
      path: "queue",
      categories,
    };
  }, [QueuesPage]);
  const ConsumerQueuesNav: AppNav = React.useMemo(() => {
    const categories: AppNavCategory[] = QUEUES.CONSUMER.map(
      ({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${ApiRoutes.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${AppRoutes.QUEUE}${value}`,
          permissionsRoute: PermissionRoutes.QUEUE,
          element: (
            <React.Suspense>
              <QueuesPage />
            </React.Suspense>
          ),
        })),
      })
    );
    return {
      title: "Consumer Queues",
      icon: <QueueOutlinedIcon />,
      path: "queue",
      categories,
    };
  }, [QueuesPage]);

  return [
    // SUPPRESSIONS
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
              title: "Submit Suppressions Email",
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
              apiRoute: ApiRoutes.SUPPRESSION_EMAIL + "-submit",
              appRoute: AppRoutes.SUPPRESSION_EMAIL + "-submit",
              permissionsRoute: PermissionRoutes.SUPPRESSION_EMAIL,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitEmailPage />
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
              title: "Submit Suppressions Domains",
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
              title: "Submit Suppressions Mx",
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX}`,
              apiRoute: ApiRoutes.SUPPRESSION_MX + "-submit",
              appRoute: AppRoutes.SUPPRESSION_MX + "-submit",
              permissionsRoute: PermissionRoutes.SUPPRESSION_MX,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitMxPage />
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
        {
          title: "ADMINS ONLY",
          children: [
            {
              title: "Prod Files",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL,
              apiRoute: ApiRoutes.SUPPRESSION_PROD_FILES,
              appRoute: AppRoutes.SUPPRESSION_PROD_FILES,
              permissionsRoute: PermissionRoutes.ADMIN,
              element: (
                <React.Suspense>
                  <SuppressionSubmitProdFilesPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
    // DNSBL
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
              apiRoute: ApiRoutes.BLACKLIST_DOMAIN,
              appRoute: AppRoutes.BLACKLIST_DOMAIN,
              permissionsRoute: PermissionRoutes.BLACKLIST_DOMAIN,
              element: (
                <React.Suspense>
                  <BlacklistDomainPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
    // QUEUES
    { ...WorkersQueuesNav },
    { ...ConsumerQueuesNav },
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
