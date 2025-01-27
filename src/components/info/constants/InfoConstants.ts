import APP_CONSTANTS from "../../../constants/AppConstants";
import { PageInfo } from "../types";

export const PagesInfo: PageInfo[] = [
  {
    title: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_EMAIL,
    appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_EMAIL,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression emails to our database for the future ESP email's lists validation",
    permissions: [APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_EMAIL.default],
  },
  {
    title: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_DOMAIN,
    appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_DOMAIN,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression domains to our database for the future ESP email's lists validation",
    permissions: [APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_DOMAIN.default],
  },
  {
    title: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MX,
    appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_MX,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression mx to our database for the future ESP email's lists validation",
    permissions: [APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_MX.default],
  },
  {
    title: APP_CONSTANTS.PAGE_TITLES.SUPPRESSION_MASK,
    appRoute: APP_CONSTANTS.APP_ROUTES.SUPPRESSION_MASK,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) suppression masks to our database for the future ESP email's lists validation",
    permissions: [APP_CONSTANTS.PERMISSION_ROUTES.SUPPRESSION_MASK.default],
  },
  {
    title: APP_CONSTANTS.PAGE_TITLES.BLACKLIST_DOMAIN,
    appRoute: APP_CONSTANTS.APP_ROUTES.BLACKLIST_DOMAIN,
    description:
      "This page is dedicated for creating or uploading (via 'SUBMIT FILE' button) blacklist services for future checks our domains for listings in blacklists",
    permissions: [APP_CONSTANTS.PERMISSION_ROUTES.BLACKLIST_DOMAIN.default],
  },
];
