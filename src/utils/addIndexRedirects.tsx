import { Navigate, RouteObject } from "react-router-dom";

// Helper function to add index redirects to parent routes
export const addIndexRedirects = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    if (route.children?.length) {
      // Find the first valid child route path
      const firstChildPath = route.children.find(
        (child) => child.path && !child.path.includes("*")
      )?.path;

      // Add index redirect if there's a valid child path
      if (firstChildPath) {
        return {
          ...route,
          children: [
            // Add index route that redirects to first child
            {
              index: true,
              element: <Navigate to={firstChildPath} replace />,
            },
            // Recursively process nested children
            ...addIndexRedirects(route.children),
          ],
        };
      }

      // If no valid child path, just process children recursively
      return {
        ...route,
        children: addIndexRedirects(route.children),
      };
    }
    return route;
  });
};
