export interface PermissionRoute {
  default: string;
  file?: string;
}

export const PermissionRoutes: { [key: string]: PermissionRoute } = {
  // SUPPRESSIONS
  SUPPRESSION_EMAIL: {
    default: "email-validation:suppression-email",
    file: "email-validation:suppression-email:file",
  },
  SUPPRESSION_DOMAIN: {
    default: "email-validation:suppression-domain",
    file: "email-validation:suppression-domain:file",
  },
  SUPPRESSION_MX: {
    default: "email-validation:suppression-mx",
    file: "email-validation:suppression-mx:file",
  },
  SUPPRESSION_MASK: {
    default: "email-validation:suppression-mask",
    file: "email-validation:suppression-mask:file",
  },
  // DNSBL
  BLACKLIST_DOMAIN: {
    default: "domain-lookup:blacklist-domain",
    file: "domain-lookup:blacklist-domain:file",
  },
  // QUEUE
  QUEUE: {
    default: "queue:get-queues",
  },
} as const;
