import React from "react";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import { AppNavigationSection, AppNavigationCategory } from "../../types";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import QueueIcon from "@mui/icons-material/Queue";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupIcon from "@mui/icons-material/Group";

export const useAppNav = (): AppNavigationSection[] => {
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
  const WorkersQueuesNav: AppNavigationSection = React.useMemo(() => {
    const categories: AppNavigationCategory[] = APP_CONSTANTS.QUEUES.WORKER.map(
      ({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${APP_CONSTANTS.API_ROUTES.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${APP_CONSTANTS.APP_ROUTES.QUEUE}${value}`,
          permissionsRoute: APP_CONSTANTS.PERMISSION_ROUTES.QUEUE,
          queryKey: APP_CONSTANTS.QUERY_KEYS.QUEUE,
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
  const ConsumerQueuesNav: AppNavigationSection = React.useMemo(() => {
    const categories: AppNavigationCategory[] =
      APP_CONSTANTS.QUEUES.CONSUMER.map(({ title: categoryTitle, routes }) => ({
        title: categoryTitle,
        children: routes.map(({ title, value }) => ({
          title,
          pageTitle: title,
          apiRoute: `${APP_CONSTANTS.API_ROUTES.QUEUE_JOB}?queueName=${value}`,
          appRoute: `${APP_CONSTANTS.APP_ROUTES.QUEUE}${value}`,
          permissionsRoute: APP_CONSTANTS.PERMISSION_ROUTES.QUEUE,
          queryKey: APP_CONSTANTS.QUERY_KEYS.QUEUE,
          element: (
            <React.Suspense>
              <QueuesPage />
            </React.Suspense>
          ),
        })),
      }));
    return {
      title: "Consumer Queues",
      icon: <QueueOutlinedIcon />,
      path: "queue",
      categories,
    };
  }, [QueuesPage]);

  // PARTNERS
  const MailerPartnersPage = React.lazy(
    () => import("../../pages/partners/MailerPartnersPage")
  );
  const MailerPartnersProxyPage = React.lazy(
    () => import("../../pages/partners/MailerPartnerProxy")
  );

  return React.useMemo(
    () => [
      // INFO
      {
        title: "Info",
        icon: <InfoOutlinedIcon />,
        freeAccess: true,
        path: "info",
        categories: [
          {
            title: "main",
            children: [
              {
                title: APP_CONSTANTS.PAGE_TITLES.INFO,
                pageTitle: APP_CONSTANTS.PAGE_TITLES.INFO,
                apiRoute: "",
                appRoute: APP_CONSTANTS.APP_ROUTES.INFO,
                permissionsRoute: APP_CONSTANTS.PERMISSION_ROUTES.ALLOW_ALL,
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
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_EMAIL,
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_EMAIL,
                queryKey: APP_CONSTANTS.QUERY_KEYS.SUPPRESSION_EMAIL,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_EMAIL,
                element: (
                  <React.Suspense>
                    <SuppressionsEmailPage />
                  </React.Suspense>
                ),
              },
              {
                title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
                pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
                apiRoute:
                  APP_CONSTANTS.API_ROUTES.SUPPRESSION_EMAIL + "-submit",
                appRoute:
                  APP_CONSTANTS.APP_ROUTES.SUPPRESSION_EMAIL + "-submit",
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_EMAIL,
                element: (
                  <React.Suspense>
                    <SuppressionsSubmitEmailPage />
                  </React.Suspense>
                ),
              },
              {
                title: "Domain",
                pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN,
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_DOMAIN,
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_DOMAIN,
                queryKey: APP_CONSTANTS.QUERY_KEYS.SUPPRESSION_DOMAIN,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_DOMAIN,
                element: (
                  <React.Suspense>
                    <SuppressionsDomainPage />
                  </React.Suspense>
                ),
              },
              {
                title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN}`,
                pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN}`,
                apiRoute:
                  APP_CONSTANTS.API_ROUTES.SUPPRESSION_DOMAIN + "-submit",
                appRoute:
                  APP_CONSTANTS.APP_ROUTES.SUPPRESSION_DOMAIN + "-submit",
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_DOMAIN,
                element: (
                  <React.Suspense>
                    <SuppressionsSubmitDomainPage />
                  </React.Suspense>
                ),
              },
              {
                title: "Mx",
                pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX,
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_MX,
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_MX,
                queryKey: APP_CONSTANTS.QUERY_KEYS.SUPPRESSION_MX,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_MX,
                element: (
                  <React.Suspense>
                    <SuppressionsMxPage />
                  </React.Suspense>
                ),
              },
              {
                title: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL}`,
                pageTitle: `Submit ${APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX}`,
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_MX + "-submit",
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_MX + "-submit",
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_MX,
                element: (
                  <React.Suspense>
                    <SuppressionsSubmitMxPage />
                  </React.Suspense>
                ),
              },
              {
                title: "Mask",
                pageTitle: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MASK,
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_MASK,
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_MASK,
                queryKey: APP_CONSTANTS.QUERY_KEYS.SUPPRESSION_MASK,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_MASK,
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
                apiRoute: APP_CONSTANTS.API_ROUTES.SUPPRESSION_PROD_FILES,
                appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_PROD_FILES,
                permissionsRoute: APP_CONSTANTS.PERMISSION_ROUTES.ADMIN,
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
      // PARTNERS
      {
        title: "PARTNERS",
        icon: <GroupIcon />,
        path: "partners",
        categories: [
          {
            title: "MAIN",
            children: [
              {
                title: APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNERS,
                pageTitle: APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNERS,
                apiRoute: APP_CONSTANTS.API_ROUTES.MAILER_PARTNER,
                appRoute: APP_CONSTANTS.APP_ROUTES.MAILER_PARTNER,
                queryKey: APP_CONSTANTS.QUERY_KEYS.MAILER_PARTNER,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.MAILER_PARTNER,
                element: (
                  <React.Suspense>
                    <MailerPartnersPage />
                  </React.Suspense>
                ),
              },
              {
                title: APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNER_PROXY,
                pageTitle: APP_CONSTANTS.PAGE_TITLES.MAILER_PARTNER_PROXY,
                apiRoute: APP_CONSTANTS.API_ROUTES.MAILER_PARTNER_PROXY,
                appRoute: APP_CONSTANTS.APP_ROUTES.MAILER_PARTNER_PROXY,
                queryKey: APP_CONSTANTS.QUERY_KEYS.MAILER_PARTNER_PROXY,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.MAILER_PARTNER_PROXY,
                element: (
                  <React.Suspense>
                    <MailerPartnersProxyPage />
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
                apiRoute: APP_CONSTANTS.API_ROUTES.BLACKLIST_DOMAIN,
                appRoute: APP_CONSTANTS.APP_ROUTES.BLACKLIST_DOMAIN,
                queryKey: APP_CONSTANTS.QUERY_KEYS.BLACKLIST_DOMAIN,
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.BLACKLIST_DOMAIN,
                element: (
                  <React.Suspense>
                    <BlacklistDomainPage />
                  </React.Suspense>
                ),
              },
              {
                title: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
                pageTitle: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
                apiRoute: APP_CONSTANTS.API_ROUTES.BLACKLIST_DOMAIN + "-submit",
                appRoute: APP_CONSTANTS.APP_ROUTES.BLACKLIST_DOMAIN + "-submit",
                permissionsRoute:
                  APP_CONSTANTS.PERMISSION_ROUTES.BLACKLIST_DOMAIN,
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
                apiRoute: APP_CONSTANTS.API_ROUTES.GOOGLE_CLOUD,
                appRoute: APP_CONSTANTS.APP_ROUTES.GOOGLE_CLOUD,
                permissionsRoute: APP_CONSTANTS.PERMISSION_ROUTES.ADMIN,
                queryKey: APP_CONSTANTS.QUERY_KEYS.G_C_FILE,
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
    ],
    [
      BlacklistDomainPage,
      ConsumerQueuesNav,
      GoogleCloudFilesPage,
      InfoPage,
      MailerPartnersPage,
      MailerPartnersProxyPage,
      SubmitBlacklistDomainsPage,
      SuppressionMaskPage,
      SuppressionSubmitProdFilesPage,
      SuppressionsDomainPage,
      SuppressionsEmailPage,
      SuppressionsMxPage,
      SuppressionsSubmitDomainPage,
      SuppressionsSubmitEmailPage,
      SuppressionsSubmitMxPage,
      WorkersQueuesNav,
    ]
  );
};
