import { PermissionRoute } from "../../core/router";

export interface AppNav {
  title: string;
  icon: React.ReactNode;
  path: string;
  categories: AppNavCategory[];
}

export interface AppNavCategory {
  title: string;
  children: AppNavNode[];
}

export interface AppNavNode {
  title: string;
  pageTitle: string;
  appRoute: string;
  apiRoute: string;
  permissionsRoute: PermissionRoute;
  element: React.ReactNode;
}
