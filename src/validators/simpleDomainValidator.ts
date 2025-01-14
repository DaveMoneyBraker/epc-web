import { isString } from "../typeGuards/isString";

export const simpleDomainValidator = (value: unknown): boolean => {
  if (isString(value)) {
    const dot = value.includes(".") && !value.includes("http");
    const end = value.split(".");
    const endValue = end[end.length - 1].split("");

    return dot && !endValue.some((v) => typeof +v === "number");
  }
  return false;
};
