import { PermissionRoute } from "../types";

export const PERMISSION_ROUTES: { [key: string]: PermissionRoute } = {
  // ADMINS ONLY
  ADMIN: {
    default: "admin-only",
  },
  // ALLOW ALL
  ALLOW_ALL: {
    default: "allow-all",
  },
  // PARTNERS
  MAILER_PARTNER: {
    default: "email-validation:mailer-partner",
    file: "email-validation:mailer-partner:file",
  },
  MAILER_PARTNER_PROXY: {
    default: "email-validation:mailer-partner:proxy",
  },
  MAILER_PARTNERS_ACCESS: {
    default: "email-validation:mailer-partner:access",
    file: "email-validation:mailer-partner:file",
  },
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
  // FILES
  GOOGLE_CLOUD: {
    default: "file:gcloud",
    download: "file:gcloud:download", // action - read (to download files)
  },
} as const;
