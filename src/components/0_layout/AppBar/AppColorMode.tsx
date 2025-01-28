import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CONTEXT_HOOKS from "../../../providers/0_ContextHooks";

export const AppColorMode: React.FC = () => {
  const theme = useTheme();
  const colorMode = CONTEXT_HOOKS.useColorModeContext();

  return (
    <IconButton
      sx={{ ml: 1, color: "white" }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};
