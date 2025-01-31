import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import APP_HOOKS from "../../hooks/0_AppHooks";
import AppMutations from "../../services/mutations/AppMutations";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";
import { AppBar } from "./AppBar/AppBar";
import { LoadingBackdrop, OfflineBackdrop } from "./Backdrops";
import { AppSkeleton } from "./Skeleton";
// STYLES
import "../../styles/variables.scss";
import { NavigationDrawer } from "./NavigationDrawer";

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

const SkeletonWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: "16px",
  backgroundColor: theme.palette.background.default,
}));

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = CONTEXT_HOOKS.useAxiosContext();
  const { currentNavigation } = CONTEXT_HOOKS.useCleanedNavigationContext();
  const isFirstLoading = APP_HOOKS.useFirstPageLoading();
  const online = APP_HOOKS.useIsOnline();
  const pageTitle = React.useMemo(
    () =>
      currentNavigation?.node.pageTitle ||
      (loading ? "Loading..." : "Unknown page :("),
    [currentNavigation?.node, loading]
  );
  const { mutation: logoutMutation } = AppMutations.useLogoutMutation();
  const isSubmittingFile = React.useMemo(
    () => currentNavigation?.node?.appRoute.includes("-submit"),
    [currentNavigation?.node]
  );

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = React.useCallback(
    (appRoute?: string) => {
      setOpen(false);
      if (appRoute) {
        navigate(appRoute);
      }
    },
    [navigate]
  );
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
      <NavigationDrawer open={open} onClose={handleDrawerClose} />
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
