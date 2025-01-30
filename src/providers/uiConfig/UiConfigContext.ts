import React from "react";
import { UiConfig } from "../../types";
import APP_CONSTANTS from "../../constants/0_AppConstants";

export interface UiConfigContextValue {
  updateConfig: (config: UiConfig) => void;
  config: UiConfig;
}

export const UiConfigContext = React.createContext<UiConfigContextValue>({
  config: APP_CONSTANTS.DEFAULT_UI_CONFIG,
  updateConfig: () => {},
});
