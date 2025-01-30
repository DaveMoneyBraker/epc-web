/**
 * Validates whether a string is a valid email address
 * Follows RFC 5322 standard
 */
export const isEmail = (str: string): boolean => {
  // Matches:
  // - Local part (letters, numbers, and special characters)
  // - @ symbol
  // - Domain part (letters, numbers, hyphens, dots)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(str);
};
