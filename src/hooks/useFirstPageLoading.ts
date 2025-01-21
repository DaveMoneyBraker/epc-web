import React from "react";
import { useLocation } from "react-router-dom";
import { useAxiosContext } from "../providers/axios";

interface UseFirstPageLoadingReturn {
  isFirstLoading: boolean;
}

export const useFirstPageLoading = (): UseFirstPageLoadingReturn => {
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const location = useLocation();
  const { loading: axiosLoading } = useAxiosContext();
  const initialLoadCompleted = React.useRef(false);
  const currentPath = React.useRef(location.pathname);
  // DON'T SHOW SKELETON IN QUEUE ROUTE OR SUBMIT FILES PAGE
  const forbiddenPathnames = React.useMemo(() => ["submit", "queue"], []);

  React.useEffect(() => {
    if (
      forbiddenPathnames.some((forbiddenPathname) =>
        location.pathname.includes(forbiddenPathname)
      )
    )
      return;
    // If path changed, mark as first load for new route
    if (currentPath.current !== location.pathname) {
      setIsFirstLoading(true);
      currentPath.current = location.pathname;
      initialLoadCompleted.current = false;
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
