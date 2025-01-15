export const AppRoutes = {
  // AUTH
  LOGIN: "/auth/login",
  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "/pages/suppression/email",
  SUPPRESSION_DOMAIN: "/pages/suppression/domain",
  SUPPRESSION_MX: "/pages/suppression/mx",
  SUPPRESSION_MASK: "/pages/suppression/mask",
  SUPPRESSION_PROD_FILES: "/pages/suppression/prod-files",

  // DNSBL
  BLACKLIST_DOMAIN: "/pages/dnsbl/blacklist-domain",

  // QUEUE
  QUEUE: "/pages/queue/",

  // NOT FOUND
  NOT_FOUND: "/pages/suppressions/email",
} as const;
