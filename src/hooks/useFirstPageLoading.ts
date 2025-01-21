import React from "react";
import { useLocation } from "react-router-dom";
import ContextHooks from "../providers/0_ContextHooks";

interface UseFirstPageLoadingReturn {
  isFirstLoading: boolean;
}

export const useFirstPageLoading = (): UseFirstPageLoadingReturn => {
  const location = useLocation();
  const { loading: axiosLoading } = ContextHooks.useAxiosContext();
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const initialLoadCompleted = React.useRef(false);
  const currentPath = React.useRef(location.pathname);
  // DON'T SHOW SKELETON IN QUEUE ROUTE OR SUBMIT FILES PAGE
  const forbiddenPathnames = React.useMemo(() => ["submit", "queue"], []);

  React.useEffect(() => {
    const isPathChanged = currentPath.current !== location.pathname;
    const isForbiddenPathName = forbiddenPathnames.some((forbiddenPathname) =>
      location.pathname.includes(forbiddenPathname)
    );
    initialLoadCompleted.current = false;
    if (isForbiddenPathName) return;

    // If path changed, mark as first load for new route
    if (isPathChanged) {
      setIsFirstLoading(true);
      currentPath.current = location.pathname;
    }
  }, [location.pathname, forbiddenPathnames]);

  React.useEffect(() => {
    // Only handle first load completion
    if (isFirstLoading && !axiosLoading && !initialLoadCompleted.current) {
      setIsFirstLoading(false);
      initialLoadCompleted.current = true;
    }
  }, [axiosLoading, isFirstLoading]);

  return { isFirstLoading };
};
