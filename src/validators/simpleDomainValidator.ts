export const simpleDomainValidator = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.includes(".") && !value.includes("http");
  }
  return false;
};
