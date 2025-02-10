import { SelectOption } from "../default/default";

export const BLACKLIST_DOMAIN_BASED_TYPE: BlacklistDomainBasedMap = {
  IP_BASED: "IP_BASED",
  DOMAIN_BASED: "DOMAIN_BASED",
};

export type BlacklistDomainBasedType = "IP_BASED" | "DOMAIN_BASED";

export type BlacklistDomainBasedMap = {
  [K in BlacklistDomainBasedType]: BlacklistDomainBasedType;
};

export const BlacklistDomainBasedOptions: SelectOption<BlacklistDomainBasedType>[] =
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
