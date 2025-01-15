export const emailValidator = (email: unknown): boolean => {
  if (typeof email !== "string") return false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
