import React from "react";
import { ColorModeContext, ColorModeContextValue } from "./ColorModeContext";

export type UseColorModeContext = () => ColorModeContextValue;

export const useColorModeContext: UseColorModeContext = () => {
  const value = React.useContext(ColorModeContext);
  if (!value) {
    throw new Error("useColorModeContext used outside of ColorModeContext");
  }
  return value;
};
