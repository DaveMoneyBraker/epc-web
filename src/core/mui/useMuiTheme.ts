import React from "react";
import { useAppDarkTheme } from "./MUI-dark-theme";
import { useAppLightTheme } from "./MUI-light-theme";
import { ThemeModeValue } from "../../types";

export const useAppMuiTheme = (): ThemeModeValue => {
  const lightTheme = useAppLightTheme();
  const darkTheme = useAppDarkTheme();
  return React.useMemo<ThemeModeValue>(
    () => ({
      light: lightTheme,
      dark: darkTheme,
    }),
    [lightTheme, darkTheme]
  );
};
