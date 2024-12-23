import { DEFAULT_IS_DOMAINS } from "../constants/DefaultIsp";

// IF NOT DEFAULT ISP - TRUE IS RETURNED
export const defaultISPDomainValidator = (value: unknown): boolean => {
  if (typeof value === "string") {
    const allDefaultDomains: string[] = [];
    Object.values(DEFAULT_IS_DOMAINS).forEach((v) =>
      v.forEach((domain) => allDefaultDomains.push(domain))
    );
    return !allDefaultDomains.some((defaultIspDomain) =>
      value.includes(defaultIspDomain)
    );
  }
  return false;
};
