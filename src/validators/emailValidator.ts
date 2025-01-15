import { isString } from "../utils/checks";
import { simpleDomainValidator } from "./simpleDomainValidator";

/**
 * Validates an email address according to common rules:
 * - Must have exactly one @ symbol
 * - Local part (before @) allows letters, numbers, and certain special characters
 * - Local part cannot start or end with special characters
 * - Domain part follows domain validation rules
 * - No whitespace allowed
 * - Proper length limits applied
 */

export const emailValidator = (email: string | unknown): boolean => {
  // Basic input validation
  if (!email || !isString(email)) {
    return false;
  }

  // Remove whitespace and check length
  // (email as string) is kostyl for lagged ts server
  const trimmedEmail: string = (email as string).trim();
  if (trimmedEmail.length === 0 || trimmedEmail.length > 254) {
    return false;
  }

  // Check for exactly one @ symbol
  const parts = trimmedEmail.split("@");
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  // Validate local part (before @)
  if (!validateLocalPart(localPart)) {
    return false;
  }

  // Validate domain part (after @)
  if (!simpleDomainValidator(domain)) {
    return false;
  }

  return true;
};

/**
 * Validates the local part of an email address (before @)
 */
function validateLocalPart(localPart: string): boolean {
  // Check length (1-64 characters)
  if (localPart.length === 0 || localPart.length > 64) {
    return false;
  }

  // No whitespace allowed
  if (/\s/.test(localPart)) {
    return false;
  }

  // Allow letters, numbers, and these special characters: !#$%&'*+-/=?^_`{|}~.
  // Dots cannot be first or last character and cannot appear consecutively
  const localPartRegex =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;

  return localPartRegex.test(localPart);
}
