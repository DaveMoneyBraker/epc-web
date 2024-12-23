import React from "react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AxiosProvider } from "./axios";
import { AccountProvider } from "./account";
import { Outlet } from "react-router-dom";
import { CleanedNavigationProvider } from "./navigation";
import { RoutesGuardProvider } from "./routesGuard";
import { ReactQueryProvider } from "./reactQueryProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ColorModeProvider } from "./colorMode";

export const ConfigureProviders: React.FC = () => {
  return (
    // MUI THEME PROVIDER
    <ColorModeProvider>
      <CssBaseline />
      {/* DATE FORMATS PROVIDER FOR MUI DATE PICKERS */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/*  NOTISTACK NOTIFICATIONS PROVIDER */}
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={4000}
        >
          {/* CUSTOM AXIOS INSTANCE PROVIDER */}
          <AxiosProvider>
            {/* TANSTACK QUERY PROVIDER */}
            <ReactQueryProvider>
              {/* USER DATA - CURRENT USER, PERMISSIONS - PROVIDER */}
              <AccountProvider>
                {/* PROVIDER WITH CLEANED BY USER PERMISSIONS NAVIGATION NODES */}
                <CleanedNavigationProvider>
                  {/* PROVIDER FOR HANDLING UNWANTED ROUTES VISITING */}
                  <RoutesGuardProvider>
                    <Outlet />
                  </RoutesGuardProvider>
                </CleanedNavigationProvider>
              </AccountProvider>
            </ReactQueryProvider>
          </AxiosProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ColorModeProvider>
  );
};
