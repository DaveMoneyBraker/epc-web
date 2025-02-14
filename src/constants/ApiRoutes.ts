export const API_ROUTES = {
  // AUTH
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  REFRESH_TOKEN: "auth/refresh-token",

  // ACCOUNT
  CURRENT_USER: "account/current",
  CURRENT_USER_ROLES: "roles/current",
  CURRENT_USER_PERMISSIONS: "roles/permissions/current",

  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "suppression/email",
  SUPPRESSION_DOMAIN: "suppression/domain",
  SUPPRESSION_MX: "suppression/mx",
  SUPPRESSION_MASK: "suppression/mask",
  SUPPRESSION_PROD_FILES: "suppression/email-without-esp/file",

  //PARTNERS
  MAILER_PARTNER: "mailer-partner",
  MAILER_PARTNER_PROXY: "mailer-partner-proxy",
  MAILER_PARTNERS_ACCESS: "mailer-partner-access",

  // QUEUES
  QUEUE_JOB: "queue/job",
  QUEUE: "queue",

  // DNSBL
  BLACKLIST_DOMAIN: "blacklist-domain",

  // FILES
  GOOGLE_CLOUD: "file",

  // DEV ROUTE
};
