import { PageInfo } from "../types";
import { APP_ROUTES } from "./AppRoutes";
import { PAGE_TITLES } from "./PageTitles";
import { PERMISSION_ROUTES } from "./PermissionRoutes";

export const PAGES_INFO: PageInfo[] = [
  {
    title: PAGE_TITLES.SUPPRESSION_EMAIL,
    appRoute: APP_ROUTES.SUPPRESSION_EMAIL,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression emails to our database for the future ESP email's lists validation",
    permissions: [PERMISSION_ROUTES.SUPPRESSION_EMAIL.default],
  },
  {
    title: PAGE_TITLES.SUPPRESSION_DOMAIN,
    appRoute: APP_ROUTES.SUPPRESSION_DOMAIN,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression domains to our database for the future ESP email's lists validation",
    permissions: [PERMISSION_ROUTES.SUPPRESSION_DOMAIN.default],
  },
  {
    title: PAGE_TITLES.SUPPRESSION_MX,
    appRoute: APP_ROUTES.SUPPRESSION_MX,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression mx to our database for the future ESP email's lists validation",
    permissions: [PERMISSION_ROUTES.SUPPRESSION_MX.default],
  },
  {
    title: PAGE_TITLES.SUPPRESSION_MASK,
    appRoute: APP_ROUTES.SUPPRESSION_MASK,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression masks to our database for the future ESP email's lists validation",
    permissions: [PERMISSION_ROUTES.SUPPRESSION_MASK.default],
  },
  {
    title: PAGE_TITLES.BLACKLIST_DOMAIN,
    appRoute: APP_ROUTES.BLACKLIST_DOMAIN,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) blacklist services for future checks our domains for listings in blacklists",
    permissions: [PERMISSION_ROUTES.BLACKLIST_DOMAIN.default],
  },
];
