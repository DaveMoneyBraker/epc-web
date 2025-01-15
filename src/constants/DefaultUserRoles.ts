import { UserRoles } from "../types";

type RolesMap = {
  [K in Uppercase<UserRoles>]: Lowercase<K>;
};

export const DEFAULT_USER_ROLES: RolesMap = {
  ADMIN: "admin",
  USER: "user",
  DEVELOPER: "developer",
};
