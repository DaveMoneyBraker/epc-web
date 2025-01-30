import React from "react";
import { ChildrenProps, UiConfig } from "../../types";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { UiConfigContext, UiConfigContextValue } from "./UiConfigContext";

export const UiConfigProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { get, set } = APP_HOOKS.useLocalStorage<UiConfig>();
  const [config, setConfig] = React.useState<UiConfig>(
    APP_CONSTANTS.DEFAULT_UI_CONFIG
  );

  const updateConfig = React.useCallback(
    (newConfig: UiConfig) => {
      setConfig(newConfig);
      set(APP_CONSTANTS.LOCAL_STORAGE.UI_CONFIG, newConfig);
    },
    [set]
  );

  React.useEffect(() => {
    const userConfig = get(APP_CONSTANTS.LOCAL_STORAGE.UI_CONFIG);
    if (userConfig) {
      setConfig(userConfig);
    } else {
      set(
        APP_CONSTANTS.LOCAL_STORAGE.UI_CONFIG,
        APP_CONSTANTS.DEFAULT_UI_CONFIG
      );
    }
  }, []);

  const value = React.useMemo<UiConfigContextValue>(
    () => ({
      config,
      updateConfig,
    }),
    [config, updateConfig]
  );

  return (
    <UiConfigContext.Provider value={value}>
      {children}
    </UiConfigContext.Provider>
  );
};
