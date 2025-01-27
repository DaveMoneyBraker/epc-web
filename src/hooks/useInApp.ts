import React from "react";
import { useLocation } from "react-router-dom";

export type UseInApp = () => boolean;

export const useInApp: UseInApp = () => {
  const [inApp, setInApp] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    setInApp(location.pathname.includes("pages"));
  }, [location]);
  return inApp;
};
