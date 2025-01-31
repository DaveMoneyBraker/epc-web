export interface AppNavigationSection {
  title: string;
  icon: React.ReactNode;
  path: string;
  categories: AppNavigationCategory[];
  freeAccess?: boolean;
}

export interface AppNavigationCategory {
  title: string;
  children: AppNavigationNode[];
}

export interface AppNavigationNode {
  title: string;
  pageTitle: string;
  appRoute: string;
  apiRoute: string;
  queryKey?: string;
  permissionsRoute: PermissionRoute;
  element: React.ReactNode;
}

export interface CurrentNavigation {
  section: AppNavigationSection;
  category: AppNavigationCategory;
  node: AppNavigationNode;
}

export interface NavigationState {
  navigation: AppNavigationSection[];
  currentNavigation: CurrentNavigation | null;
  forbiddenRoutes: string[];
}

export interface PermissionRoute {
  default: string;
  file?: string;
  download?: string;
}
