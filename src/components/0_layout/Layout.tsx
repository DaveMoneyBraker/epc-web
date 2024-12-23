import React from "react";
import { AppBar } from "./AppBar/AppBar";
import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { AppBackdrop } from "./Backdrop";
import { AppDrawer } from "./Drawer";
import AppMutations from "../../services/mutations/AppMutations";
import { useCleanedNavigationContext } from "../../providers/navigation";
import { useAxiosContext } from "../../providers/axios";
import { useAccountContext } from "../../providers/account/useAccountContext";

const Wrapper = styled("div")({
  height: "100vh",
  overflow: "hidden",
});

const Container = styled("div")({
  height: "calc(100vh - 70px)",
  maxHeight: "calc(100vh - 70px)",
  overflow: "scroll",
});

export const Layout: React.FC = () => {
  const location = useLocation();
  const { loading } = useAxiosContext();
  const { nav, currentNavNode } = useCleanedNavigationContext();
  const pageTitle = React.useMemo(
    () => currentNavNode?.pageTitle || "Unknown page",
    [currentNavNode]
  );
  const { user } = useAccountContext();
  const { mutation: logoutMutation } = AppMutations.useLogoutMutation();

  const [open, setOpen] = React.useState(false);
  const displayName = React.useMemo(() => {
    if (!user) {
      return "loading...";
    }
    const { firstName, lastName } = user;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (!firstName || !lastName) {
      return firstName || lastName;
    }
    return "no user found";
  }, [user]);

  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => logoutMutation.mutate();

  // CLOSE MENU ON LOCATION CHANGE
  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <Wrapper>
      {/* LOADING OVERLAY */}
      <AppBackdrop loading={loading} />

      {/* TOP NAVIGATION */}
      <AppBar
        onClick={() => setOpen(true)}
        pageTitle={pageTitle}
        displayName={displayName}
        onLogout={handleLogout}
      />
      {/* SIDEBAR NAVIGATION */}
      <AppDrawer nav={nav} open={open} onClose={handleDrawerClose} />
      {/* CONTENT */}
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};
