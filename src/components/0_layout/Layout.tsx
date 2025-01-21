import React from "react";
import { AppBar } from "./AppBar/AppBar";
import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { LoadingBackdrop, OfflineBackdrop } from "./Backdrops";
import { AppDrawer } from "./Drawer";
import AppMutations from "../../services/mutations/AppMutations";
import { useCleanedNavigationContext } from "../../providers/navigation";
import { useAxiosContext } from "../../providers/axios";
import AppHooks from "../../hooks/0_AppHooks";
import { AppSkeleton } from "./Skeleton";
// STYLES
import "../../styles/variables.scss";

const Wrapper = styled("div")({
  height: "100vh",
  overflow: "hidden",
});

const Container = styled("div")({
  height: "var(--content-height)",
  maxHeight: "var(--content-height)",
  overflowY: "auto",
  transition: "all var(--transition-duration) ease-in-out",
});

const ContentWrapper = styled("div")({
  position: "relative",
  height: "100%",
  width: "100%",
});

const SkeletonWrapper = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: "16px",
  backgroundColor: "white",
});

export const Layout: React.FC = () => {
  const location = useLocation();
  const { loading } = useAxiosContext();
  const { isFirstLoading } = AppHooks.useFirstPageLoading();
  const online = AppHooks.useIsOnline();
  const { nav, currentNavNode } = useCleanedNavigationContext();
  const pageTitle = React.useMemo(
    () =>
      currentNavNode?.pageTitle || (loading ? "Loading..." : "Unknown page :("),
    [currentNavNode, loading]
  );
  const { mutation: logoutMutation } = AppMutations.useLogoutMutation();
  const isSubmittingFile = React.useMemo(
    () => currentNavNode?.appRoute.includes("-submit"),
    [currentNavNode]
  );

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => logoutMutation.mutate();

  // CLOSE MENU ON LOCATION CHANGE
  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <Wrapper>
      {/* OFFLINE OVERLAY */}
      {!online && <OfflineBackdrop online={online} />}
      {/* LOADING OVERLAY */}
      {!isSubmittingFile && online && <LoadingBackdrop loading={loading} />}

      {/* TOP NAVIGATION */}
      <AppBar
        onClick={() => setOpen(true)}
        pageTitle={pageTitle}
        onLogout={handleLogout}
      />
      {/* SIDEBAR NAVIGATION */}
      <AppDrawer nav={nav} open={open} onClose={handleDrawerClose} />
      {/* CONTENT */}
      <Container>
        <ContentWrapper>
          <Outlet />
          {isFirstLoading && (
            <SkeletonWrapper>
              <AppSkeleton />
            </SkeletonWrapper>
          )}
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};
