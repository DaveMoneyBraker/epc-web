import { TitleValueObject } from "../default/default";

export const BLACKLIST_DOMAIN_BASED_TYPE = {
  IP_BASED: "IP_BASED",
  DOMAIN_BASED: "DOMAIN_BASED",
} as const;

export type BlacklistDomainBasedType =
  (typeof BLACKLIST_DOMAIN_BASED_TYPE)[keyof typeof BLACKLIST_DOMAIN_BASED_TYPE];

export const BlacklistDomainBasedOptions: TitleValueObject<BlacklistDomainBasedType>[] =
  [
    {
      title: BLACKLIST_DOMAIN_BASED_TYPE.IP_BASED,
      value: BLACKLIST_DOMAIN_BASED_TYPE.IP_BASED,
    },
    {
      title: BLACKLIST_DOMAIN_BASED_TYPE.DOMAIN_BASED,
      value: BLACKLIST_DOMAIN_BASED_TYPE.DOMAIN_BASED,
    },
  ];
