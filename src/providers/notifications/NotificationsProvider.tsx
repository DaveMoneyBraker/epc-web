import React from "react";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ChildrenProps } from "../../types";
import { styled } from "@mui/material";
import APP_HOOKS from "../../hooks/0_AppHooks";

export const NotificationsProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const {
    primary: { light },
    error: { main: errorMain },
    warning: { main: warningMain },
  } = APP_HOOKS.useThemePalette();
  const StyledMaterialDesignContent = React.useMemo(
    () =>
      styled(MaterialDesignContent)(() => ({
        "&.notistack-MuiContent-success": {
          backgroundColor: light,
        },
        "&.notistack-MuiContent-error": {
          backgroundColor: errorMain,
        },
        "&.notistack-MuiContent-warning": {
          backgroundColor: warningMain,
        },
      })),
    [light, errorMain, warningMain]
  );

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
