export interface AppNav {
  title: string;
  icon: React.ReactNode;
  path: string;
  categories: AppNavCategory[];
  freeAccess?: boolean;
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
  queryKey?: string;
  permissionsRoute: PermissionRoute;
  element: React.ReactNode;
}

export interface NavigationState {
  nav: AppNav[];
  currentNavNode: AppNavNode | null;
  forbiddenRoutes: string[];
}

export interface PermissionRoute {
  default: string;
  file?: string;
  download?: string;
}
