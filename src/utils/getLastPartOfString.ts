export const getLastPartOfString = (value: string, del = "/") =>
  value.split(del).pop();
