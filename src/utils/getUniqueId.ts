export const getUniqueId = (prefix = "element", postfix = "id"): string =>
  prefix + "_" + Math.random().toString(16).slice(2) + "_" + postfix;
