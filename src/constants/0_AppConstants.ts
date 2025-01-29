import { PAGE_TITLES } from "./PageTitles";
import { PERMISSION_ACTIONS } from "./PermissionActions";
import { NOTIFICATION_VARIANTS } from "./NotificationVariants";
import {
  DEFAULT_ISP_KEYS,
  DEFAULT_IS_DOMAINS,
  DEFAULT_ISP_EMAILS,
} from "./DefaultIsp";
import { DEFAULT_USER_ROLES } from "./DefaultUserRoles";
import { APP_ERRORS } from "./AppErrors";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "./DefaultPageSizeOptions";
import { THEME_MODE } from "./ThemeConstants";
import { LOCAL_STORAGE } from "./LocalStorage";
import { API_ROUTES } from "./ApiRoutes";
import { APP_ROUTES } from "./AppRoutes";
import { PERMISSION_ROUTES } from "./PermissionRoutes";
import { QUEUES, QUEUE_STATUS } from "./QueuesConstant";
import { PAGES_INFO } from "./Info";
import { SUPPRESSION_TYPES, SUPPRESSIONS_TYPE_OPTIONS } from "./Suppressions";
import { PAGE_ACTIONS } from "./PageActions";
import * as FILTERS from "./Filters";
import * as DNSBL from "./Dnsbl";

const APP_CONSTANTS = {
  PAGE_TITLES,
  PERMISSION_ACTIONS,
  NOTIFICATION_VARIANTS,
  DEFAULT_ISP_KEYS,
  DEFAULT_IS_DOMAINS,
  DEFAULT_ISP_EMAILS,
  DEFAULT_USER_ROLES,
  APP_ERRORS,
  DEFAULT_PAGE_SIZE_OPTIONS,
  THEME_MODE,
  LOCAL_STORAGE,
  API_ROUTES,
  APP_ROUTES,
  PERMISSION_ROUTES,
  QUEUES,
  QUEUE_STATUS,
  PAGES_INFO,
  SUPPRESSION_TYPES,
  SUPPRESSIONS_TYPE_OPTIONS,
  PAGE_ACTIONS,
  ...FILTERS,
  ...DNSBL,
} as const;

export default APP_CONSTANTS;
