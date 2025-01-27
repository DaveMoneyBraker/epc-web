import React from "react";
import { ColorModeContext } from "./ColorModeContext";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { ChildrenProps, ThemeMode } from "../../types";
import APP_HOOKS from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import { useAppMuiTheme } from "../../core/mui";

export const ColorModeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const themes = useAppMuiTheme();
  const { get, set } = APP_HOOKS.useLocalStorage<ThemeMode>();
  const [theme, setTheme] = React.useState<Theme>(themes.light);

  const changeRootClassName = React.useCallback((newClassName: ThemeMode) => {
    const root = document.getElementById("root");
    if (root) {
      const { className } = root;
      // ON INIT ROOT HAS NO CLASS
      if (className) {
        document.getElementById("root")?.classList.remove(className);
      }
      document.getElementById("root")?.classList.add(newClassName);
    }
  }, []);

  React.useEffect(() => {
    const currentThemeMode =
      get(APP_CONSTANTS.LOCAL_STORAGE.COLOR_MODE) ||
      APP_CONSTANTS.THEME_MODE.LIGHT;
    document.getElementById("root")?.classList.add(currentThemeMode);
    setTheme(themes[currentThemeMode]);
  }, [themes, get]);

  const value = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme((prevMode) => {
          const config =
            prevMode === themes.light
              ? {
                  newTheme: themes.dark,
                  newThemeMode: APP_CONSTANTS.THEME_MODE.DARK,
                }
              : {
                  newTheme: themes.light,
                  newThemeMode: APP_CONSTANTS.THEME_MODE.LIGHT,
                };
          changeRootClassName(config.newThemeMode);
          set(APP_CONSTANTS.LOCAL_STORAGE.COLOR_MODE, config.newThemeMode);
          return config.newTheme;
        });
      },
    }),
    [themes, set, changeRootClassName]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {/* RESET DEFAULT CSS STYLES */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
