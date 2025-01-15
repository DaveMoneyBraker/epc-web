import { Theme, useTheme } from "@mui/material";
import React from "react";

export const useThemePalette = () => {
  const theme = useTheme<Theme>();
  return React.useMemo(() => ({ ...theme.palette }), [theme]);
};
