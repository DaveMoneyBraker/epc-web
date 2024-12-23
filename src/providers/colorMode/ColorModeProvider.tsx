import React from "react";
import { ColorModeContext } from "./ColorModeContext";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ChildrenProps } from "../../types";
import { useAppLightTheme } from "../../core/mui";
import AppHooks from "../../hooks/0_AppHooks";
import { useAppDarkTheme } from "../../core/mui/MUI-dark-theme";

type Mode = "light" | "dark";

export const ColorModeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const lightTheme = useAppLightTheme();
  const [getItem, setItem] = AppHooks.useLocalStorage<Mode>();
  const [mode, setMode] = React.useState<Mode>("light");

  const changeRootClassName = React.useCallback((currentMode: string) => {
    const root = document.getElementById("root");
    if (root) {
      const { className } = root;
      const newClassName = currentMode === "light" ? "dark" : "light";
      // ON INIT ROOT HAS NO CLASS
      if (className) {
        document.getElementById("root")?.classList.remove(className);
      }
      document.getElementById("root")?.classList.add(newClassName);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          changeRootClassName(prevMode);
          setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    [setMode, setItem, changeRootClassName]
  );

  React.useEffect(() => {
    const existedColorMode = getItem("colorMode") || "light";
    document.getElementById("root")?.classList.add(existedColorMode);
    setMode(existedColorMode);
  }, [getItem, setMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === "light" ? lightTheme : useAppDarkTheme}>
        {/* RESET DEFAULT CSS STYLES */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
