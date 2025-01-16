import { isString } from "../../typeGuards/isString";

/**
 * Validates a domain name string according to simplified rules:
 * - No protocols (http://, etc.)
 * - Letters, numbers and hyphens allowed in domain parts
 * - No numbers in TLD
 * - At least domain and TLD required
 * - Supports subdomains
 */

export const validateSimpleDomain = (domain: string | unknown): boolean => {
  // Domain should be a string and not empty
  if (!domain || !isString(domain)) {
    return false;
  }

  // Remove leading/trailing whitespace
  const trimmedDomain: string = domain.trim();

  // No protocols allowed
  if (trimmedDomain.includes("://") || trimmedDomain.includes("//")) {
    return false;
  }

  // Split domain into parts
  const parts: string[] = trimmedDomain.split(".");

  // Must have at least 2 parts (domain.tld)
  if (parts.length < 2) {
    return false;
  }

  // Check each part
  for (const part of parts) {
    // Parts cannot be empty
    if (part.length === 0) {
      return false;
    }

    // Parts can contain letters, numbers, and hyphens
    // Cannot start or end with hyphen
    if (!/^[a-zA-Z0-9]+[a-zA-Z0-9\-]*[a-zA-Z0-9]+$|^[a-zA-Z0-9]+$/.test(part)) {
      return false;
    }
  }

  // TLD must be only letters (no numbers)
  const tld: string = parts[parts.length - 1];
  if (!/^[a-zA-Z]+$/.test(tld)) {
    return false;
  }

  return true;
};
