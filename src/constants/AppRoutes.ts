export const APP_ROUTES = {
  // AUTH
  LOGIN: "/auth/login",
  // PAGES ROOT
  PAGES: "/pages",
  // INFO
  INFO: "/pages/info/main",
  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "/pages/suppression/email",
  SUPPRESSION_DOMAIN: "/pages/suppression/domain",
  SUPPRESSION_MX: "/pages/suppression/mx",
  SUPPRESSION_MASK: "/pages/suppression/mask",
  SUPPRESSION_PROD_FILES: "/pages/suppression/prod-files",

  // DNSBL
  BLACKLIST_DOMAIN: "/pages/dnsbl/blacklist-domain",

  //PARTNERS
  MAILER_PARTNER: "/pages/partners/mailer-partner",
  MAILER_PARTNER_PROXY: "/pages/partners/mailer-partner-proxy",

  // QUEUE
  QUEUE: "/pages/queue/",

  // FILES
  GOOGLE_CLOUD: "/pages/files/google-cloud",

  // NOT FOUND
  NOT_FOUND: "/pages/not-found",
} as const;
