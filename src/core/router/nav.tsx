import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import { AppNav, AppNavCategory } from "../../types";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import QueueIcon from "@mui/icons-material/Queue";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const useAppNav = (): AppNav[] => {
  const { API_ROUTES, APP_ROUTES, PERMISSION_ROUTES, QUEUES } = APP_CONSTANTS;
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

  // FILES
  const GoogleCloudFilesPage = React.lazy(
    () => import("../../pages/files/GoogleCloudFilesPage")
  );

  // DNSBL
  const BlacklistDomainPage = React.lazy(
    () => import("../../pages/dnsbl/BlackListDomainPage")
  );
  const SubmitBlacklistDomainsPage = React.lazy(
    () => import("../../pages/dnsbl/SubmitBlacklistDomainsPage")
  );

  // INFO PAGE
  const InfoPage = React.lazy(() => import("../../pages/info/InfoPage"));

  // QUEUES
  const QueuesPage = React.lazy(() => import("../../pages/queues/QueuesPage"));
  const WorkersQueuesNav: AppNav = React.useMemo(() => {
    const categories: AppNavCategory[] = QUEUES.WORKER.map(
      ({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${API_ROUTES.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${APP_ROUTES.QUEUE}${value}`,
          permissionsRoute: PERMISSION_ROUTES.QUEUE,
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
  }, [
    API_ROUTES.QUEUE_JOB,
    APP_ROUTES.QUEUE,
    PERMISSION_ROUTES.QUEUE,
    QUEUES.WORKER,
    QueuesPage,
  ]);
  const ConsumerQueuesNav: AppNav = React.useMemo(() => {
    const categories: AppNavCategory[] = QUEUES.CONSUMER.map(
      ({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${API_ROUTES.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${APP_ROUTES.QUEUE}${value}`,
          permissionsRoute: PERMISSION_ROUTES.QUEUE,
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
  }, [
    API_ROUTES.QUEUE_JOB,
    APP_ROUTES.QUEUE,
    PERMISSION_ROUTES.QUEUE,
    QUEUES.CONSUMER,
    QueuesPage,
  ]);

  return [
    // INFO
    {
      title: "Info",
      icon: <InfoOutlinedIcon />,
      path: "info",
      categories: [
        {
          title: "main",
          children: [
            {
              title: APP_CONSTANTS.PAGE_TITLES.INFO,
              pageTitle: APP_CONSTANTS.PAGE_TITLES.INFO,
              apiRoute: "",
              appRoute: APP_ROUTES.INFO,
              permissionsRoute: PERMISSION_ROUTES.ALLOW_ALL,
              element: (
                <React.Suspense>
                  <InfoPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
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
              apiRoute: API_ROUTES.SUPPRESSION_EMAIL,
              appRoute: APP_ROUTES.SUPPRESSION_EMAIL,
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_EMAIL,
              element: (
                <React.Suspense>
                  <SuppressionsEmailPage />
                </React.Suspense>
              ),
            },
            {
              title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
              apiRoute: API_ROUTES.SUPPRESSION_EMAIL + "-submit",
              appRoute: APP_ROUTES.SUPPRESSION_EMAIL + "-submit",
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_EMAIL,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitEmailPage />
                </React.Suspense>
              ),
            },
            {
              title: "Domain",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN,
              apiRoute: API_ROUTES.SUPPRESSION_DOMAIN,
              appRoute: APP_ROUTES.SUPPRESSION_DOMAIN,
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_DOMAIN,
              element: (
                <React.Suspense>
                  <SuppressionsDomainPage />
                </React.Suspense>
              ),
            },
            {
              title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN}`,
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN}`,
              apiRoute: API_ROUTES.SUPPRESSION_DOMAIN + "-submit",
              appRoute: APP_ROUTES.SUPPRESSION_DOMAIN + "-submit",
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_DOMAIN,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitDomainPage />
                </React.Suspense>
              ),
            },
            {
              title: "Mx",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX,
              apiRoute: API_ROUTES.SUPPRESSION_MX,
              appRoute: APP_ROUTES.SUPPRESSION_MX,
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_MX,
              element: (
                <React.Suspense>
                  <SuppressionsMxPage />
                </React.Suspense>
              ),
            },
            {
              title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
              pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX}`,
              apiRoute: API_ROUTES.SUPPRESSION_MX + "-submit",
              appRoute: APP_ROUTES.SUPPRESSION_MX + "-submit",
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_MX,
              element: (
                <React.Suspense>
                  <SuppressionsSubmitMxPage />
                </React.Suspense>
              ),
            },
            {
              title: "Mask",
              pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MASK,
              apiRoute: API_ROUTES.SUPPRESSION_MASK,
              appRoute: APP_ROUTES.SUPPRESSION_MASK,
              permissionsRoute: PERMISSION_ROUTES.SUPPRESSION_MASK,
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
              apiRoute: API_ROUTES.SUPPRESSION_PROD_FILES,
              appRoute: APP_ROUTES.SUPPRESSION_PROD_FILES,
              permissionsRoute: PERMISSION_ROUTES.ADMIN,
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
              title: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
              pageTitle: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
              apiRoute: API_ROUTES.BLACKLIST_DOMAIN,
              appRoute: APP_ROUTES.BLACKLIST_DOMAIN,
              permissionsRoute: PERMISSION_ROUTES.BLACKLIST_DOMAIN,
              element: (
                <React.Suspense>
                  <BlacklistDomainPage />
                </React.Suspense>
              ),
            },
            {
              title: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
              pageTitle: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
              apiRoute: API_ROUTES.BLACKLIST_DOMAIN + "-submit",
              appRoute: APP_ROUTES.BLACKLIST_DOMAIN + "-submit",
              permissionsRoute: PERMISSION_ROUTES.BLACKLIST_DOMAIN,
              element: (
                <React.Suspense>
                  <SubmitBlacklistDomainsPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },
    // FILES
    {
      title: "Files",
      icon: <FolderOpenIcon />,
      path: "files",
      categories: [
        {
          title: "google",
          children: [
            {
              title: APP_CONSTANTS.PAGE_TITLES.GOOGLE_CLOUD,
              pageTitle: APP_CONSTANTS.PAGE_TITLES.GOOGLE_CLOUD,
              apiRoute: API_ROUTES.GOOGLE_CLOUD,
              appRoute: APP_ROUTES.GOOGLE_CLOUD,
              permissionsRoute: PERMISSION_ROUTES.ADMIN,
              element: (
                <React.Suspense>
                  <GoogleCloudFilesPage />
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
