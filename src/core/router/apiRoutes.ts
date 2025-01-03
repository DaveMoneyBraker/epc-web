export const ApiRoutes = {
  // AUTH
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",

  // CURRENT USER
  CURRENT_USER: "account/current",
  CURRENT_USER_PERMISSIONS: "roles/permissions/current",

  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "suppression/email",
  SUPPRESSION_DOMAIN: "suppression/domain",
  SUPPRESSION_MX: "suppression/mx",
  SUPPRESSION_MASK: "suppression/mask",

  // DNSBL
  BLACKLIST_DOMAINS: "blacklist-domain",
} as const;
