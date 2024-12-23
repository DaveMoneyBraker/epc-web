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
    components: { ...components },
  });
};
