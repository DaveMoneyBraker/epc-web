import { User } from "./user";
import { UserPermission } from "./userPermissions";
import { UserRoles } from "./userRoles";

export interface AccountData {
  user: User | undefined;
  permissions: UserPermission[] | undefined;
  roles: UserRoles[] | undefined;
}
