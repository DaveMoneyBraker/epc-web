import { DefaultAppItem } from "../default";

export interface User extends DefaultAppItem {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  active: boolean;
  emailVerified: boolean;
}

export const emptyUser: User = {
  id: "",
  createdAt: "",
  updatedAt: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: "",
  phone: "",
  active: false,
  emailVerified: false,
};
