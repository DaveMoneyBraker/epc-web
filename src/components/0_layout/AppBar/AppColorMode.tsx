import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import CONTEXT_HOOKS from "../../../providers/0_ContextHooks";
import { EnhancedIconButton } from "../../1_enhanced";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const AppColorMode: React.FC = () => {
  const theme = useTheme();
  const colorMode = CONTEXT_HOOKS.useColorModeContext();
  const icon = React.useMemo(
    () =>
      theme.palette.mode === APP_CONSTANTS.THEME_MODE.DARK
        ? Brightness7Icon
        : Brightness4Icon,
    [theme.palette.mode]
  );

  return (
    <EnhancedIconButton
      icon={icon}
      sx={{ mr: 0.5, color: "white" }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    />
  );
};
