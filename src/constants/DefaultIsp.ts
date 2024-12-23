export const DEFAULT_ISP_KEYS = {
  GMAIL: "GMAIL",
  YAHOO: "YAHOO",
  MS: "MS",
  APPLE: "APPLE",
  COX: "COX",
  ATT: "ATT",
  COMCAST: "COMCAST",
  VERIZON: "VERIZON",
} as const;

export const DEFAULT_IS_DOMAINS: {
  [key in keyof typeof DEFAULT_ISP_KEYS]: string[];
} = {
  [DEFAULT_ISP_KEYS.GMAIL]: ["gmail."],
  [DEFAULT_ISP_KEYS.YAHOO]: ["yahoo.", "aol."],
  [DEFAULT_ISP_KEYS.VERIZON]: ["verizon."],
  [DEFAULT_ISP_KEYS.MS]: ["live.", "hotmail.", "msn.", "outlook."],
  [DEFAULT_ISP_KEYS.APPLE]: ["icloud.", "me.", "mac."],
  [DEFAULT_ISP_KEYS.COX]: ["cox."],
  [DEFAULT_ISP_KEYS.ATT]: ["att."],
  [DEFAULT_ISP_KEYS.COMCAST]: ["comcast."],
};

const convertDomainToEmail = (domain: string): string => `@${domain}`;

export const DEFAULT_ISP_EMAILS: {
  [key in keyof typeof DEFAULT_ISP_KEYS]: string[];
} = {
  [DEFAULT_ISP_KEYS.GMAIL]: DEFAULT_IS_DOMAINS.GMAIL.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.YAHOO]: DEFAULT_IS_DOMAINS.YAHOO.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.VERIZON]: DEFAULT_IS_DOMAINS.VERIZON.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.MS]: DEFAULT_IS_DOMAINS.MS.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.APPLE]: DEFAULT_IS_DOMAINS.APPLE.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.COX]: DEFAULT_IS_DOMAINS.COX.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.ATT]: DEFAULT_IS_DOMAINS.ATT.map((domain) =>
    convertDomainToEmail(domain)
  ),
  [DEFAULT_ISP_KEYS.COMCAST]: DEFAULT_IS_DOMAINS.COMCAST.map((domain) =>
    convertDomainToEmail(domain)
  ),
};
