import { createTheme, Theme } from "@mui/material/styles";
import { useAppMuiComponents, useAppMuiTypography } from "./mui-modules";

export const useAppDarkTheme = (): Theme => {
  const typography = useAppMuiTypography();
  const components = useAppMuiComponents();
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
      },
      secondary: {
        main: "#D74444",
        light: "#82e9de",
        dark: "#00867d",
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
  });
};
