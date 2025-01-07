import { isString } from "../typeGuards/isString";

export const simpleDomainValidator = (value: unknown): boolean => {
  if (isString(value)) {
    return value.includes(".") && !value.includes("http");
  }
  return false;
};
