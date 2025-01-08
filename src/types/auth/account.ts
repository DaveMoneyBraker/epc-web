import { User } from "./user";
import { UserPermission } from "./userPermissions";

export interface AccountData {
  user: User | undefined;
  permissions: UserPermission[] | undefined;
}
