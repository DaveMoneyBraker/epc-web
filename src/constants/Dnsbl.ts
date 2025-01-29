import {
  BlacklistDomainBasedMap,
  BlacklistDomainBasedType,
  TitleValueObject,
} from "../types";

export const BLACKLIST_DOMAIN_BASED_TYPE: BlacklistDomainBasedMap = {
  IP_BASED: "IP_BASED",
  DOMAIN_BASED: "DOMAIN_BASED",
};

export const BLACKLIST_DOMAIN_BASED_OPTIONS: TitleValueObject<BlacklistDomainBasedType>[] =
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
