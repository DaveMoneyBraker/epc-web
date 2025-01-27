import React from "react";
import { createTheme, Theme } from "@mui/material/styles";
import {
  useAppMuiBreakpoints,
  useAppMuiComponents,
  useAppMuiTypography,
} from "./mui-modules";

export const useAppDarkTheme = (): Theme => {
  const typography = useAppMuiTypography();
  const components = useAppMuiComponents();
  const breakpoints = useAppMuiBreakpoints();
  return React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          // LIGHT
          // primary: {
          //   light: "#4F70FF",
          //   main: "#0054F1",
          //   dark: "#005db0",
          // },
          // NEW
          primary: {
            light: "#C6CBFF",
            main: "#A1ACFF",
            dark: "#7B8DFF",
          },
          secondary: {
            light: "#82e9de",
            main: "#D74444",
            dark: "#00867d",
          },
          background: {
            default: "#020616",
            paper: "#020616",
          },
        },
        typography: { ...typography },
        breakpoints: { ...breakpoints },
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
                  "&:-webkit-autofill, &:-webkit-autofill:focus": {
                    // WebkitBoxShadow: "0 0 0 100px #121212 inset",
                    // WebkitTextFillColor: "#fff",
                    transition: "background-color 600000s 0s, color 600000s 0s",
                  },
                },
              },
            },
          },
        },
      }),
    [breakpoints, components, typography]
  );
};
