export const AppRoutes = {
  // AUTH
  LOGIN: "/auth/login",
  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "/pages/suppression/email",
  SUPPRESSION_DOMAIN: "/pages/suppression/domain",
  SUPPRESSION_MX: "/pages/suppression/mx",
  SUPPRESSION_MASK: "/pages/suppression/mask",

  // DNSBL
  BLACKLIST_DOMAINS: "/pages/dnsbl/blacklist-domains",

  // QUEUE
  QUEUE: "/pages/queue/",

  // NOT FOUND
  NOT_FOUND: "/pages/suppressions/email",
} as const;
