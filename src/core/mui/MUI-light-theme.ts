import React from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { useAppMuiComponents, useAppMuiTypography } from "./mui-modules";

export const useAppLightTheme = (): Theme => {
  const typography = useAppMuiTypography();
  const components = useAppMuiComponents();
  return React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            light: "#4F70FF",
            main: "#0054F1",
            dark: "#005db0",
          },
          secondary: {
            light: "#AEFDE7",
            main: "#92FCDF",
            dark: "##65FBD2",
          },
        },
        typography: { ...typography },
        components: {
          ...components,
          // DISABLING AUTOCOMPLETE
          MuiTextField: {
            defaultProps: {
              autoComplete: "off",
            },
            styleOverrides: {
              root: {
                input: {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px white inset",
                    WebkitTextFillColor: "#000000",
                  },
                },
              },
            },
          },
        },
      }),
    [typography, components]
  );
};
