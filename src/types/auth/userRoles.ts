export type UserRoles = "admin" | "user" | "developer";

export type RolesMap = {
  [K in Uppercase<UserRoles>]: Lowercase<K>;
};
