import { createTheme, Theme } from "@mui/material/styles";
import { useAppMuiComponents, useAppMuiTypography } from "./mui-modules";

export const useAppLightTheme = (): Theme => {
  const typography = useAppMuiTypography();
  const components = useAppMuiComponents();
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        light: "#016CC8",
        main: "#1976D2",
        dark: "#005db0",
      },
    },
    typography: { ...typography },
    components: { ...components },
  });
};
