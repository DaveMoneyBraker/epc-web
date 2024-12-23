export const toTitleCase = (value: string) =>
  value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
