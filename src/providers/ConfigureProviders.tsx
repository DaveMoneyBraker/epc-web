import React from "react";
import { CssBaseline } from "@mui/material";
import { AxiosProvider } from "./axios";
import { AccountProvider } from "./account";
import { Outlet } from "react-router-dom";
import { CleanedNavigationProvider } from "./navigation";
import { RoutesGuardProvider } from "./routesGuard";
import { ReactQueryProvider } from "./reactQueryProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ColorModeProvider } from "./colorMode";
import { NotificationsProvider } from "./notifications";

export const ConfigureProviders: React.FC = () => {
  return (
    // MUI THEME PROVIDER
    <ColorModeProvider>
      <CssBaseline />
      {/* DATE FORMATS PROVIDER FOR MUI DATE PICKERS */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/*  NOTISTACK NOTIFICATIONS PROVIDER */}
        <NotificationsProvider>
          {/* CUSTOM AXIOS INSTANCE PROVIDER */}
          <ReactQueryProvider>
            <AxiosProvider>
              {/* TANSTACK QUERY PROVIDER */}

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
            </AxiosProvider>
          </ReactQueryProvider>
        </NotificationsProvider>
      </LocalizationProvider>
    </ColorModeProvider>
  );
};
