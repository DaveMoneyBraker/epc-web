export const QUERY_KEYS = {
  // ACCOUNT
  USER: "accountUser",
  ROLES: "accountRoles",
  PERMISSIONS: "accountPermissions",
  // SUPPRESSIONS
  SUPPRESSION_EMAIL: "suppressionEmail",
  SUPPRESSION_DOMAIN: "suppressionDomain",
  SUPPRESSION_MX: "suppressionMx",
  SUPPRESSION_MASK: "suppressionMask",
  // DNSBL
  BLACKLIST_DOMAIN: "dnsblBlacklistDomain",
  //PARTNERS
  MAILER_PARTNER: "mailerPartner",
  MAILER_PARTNER_PROXY: "mailerPartnerProxy",
  MAILER_PARTNERS_ACCESS: "mailerPartnerAccess",
  // FILES
  G_C_FILE: "filesGCFile",
  // QUEUES
  QUEUE: "queue",
} as const;
