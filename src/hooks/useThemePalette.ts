import { Palette, Theme, useTheme } from "@mui/material";
import React from "react";

export type UseThemePalette = () => Palette;

export const useThemePalette: UseThemePalette = () => {
  const theme = useTheme<Theme>();
  return React.useMemo(() => ({ ...theme.palette }), [theme]);
};
