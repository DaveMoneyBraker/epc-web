import React from "react";

export interface ColorModeContextValue {
  toggleColorMode: () => any;
}

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  toggleColorMode: () => {},
});
