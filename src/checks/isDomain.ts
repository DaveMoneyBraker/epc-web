/**
 * Validates whether a string is a valid domain name
 * Accepts domains with or without www, and supports subdomains
 * Does not allow protocols (http/https)
 */
export const isDomain = (str: string): boolean => {
  // Matches:
  // - Optional www.
  // - Required domain name (letters, numbers, hyphens)
  // - Required TLD (2 or more letters)
  // - Optional subdomains
  const domainRegex =
    /^(?:(?:[a-zA-Z0-9-]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(str);
};
