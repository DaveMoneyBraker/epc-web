import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChildrenProps } from "../../types";
import { AppRoutes } from "../../core/router";

export const RoutesGuardProvider: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // IF USERS ARE VISITING UNHANDLED ROUTES - JUST SEND THEM TO LOGIN PAGE
  React.useEffect(() => {
    const { pathname } = location;
    if (pathname === "/" || pathname === "/pages" || pathname === "/pages/") {
      navigate(AppRoutes.LOGIN);
    }
  }, [location, navigate]);
  return <>{children}</>;
};
