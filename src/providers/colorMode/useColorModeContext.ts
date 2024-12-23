import React from "react";
import { ColorModeContext } from "./ColorModeContext";

export const useColorModeContext = () => {
  const value = React.useContext(ColorModeContext);
  if (!value) {
    throw new Error("useColorModeContext used outside of ColorModeContext");
  }
  return value;
};
