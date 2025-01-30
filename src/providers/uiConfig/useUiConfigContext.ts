import React from "react";
import { UiConfigContext, UiConfigContextValue } from "./UiConfigContext";

export type UseUiConfigContext = () => UiConfigContextValue;

export const useUiConfigContext: UseUiConfigContext = () => {
  const value = React.useContext(UiConfigContext);
  if (!value) {
    throw new Error("useUiConfigContext used outside of ColorModeContext");
  }
  return value;
};
