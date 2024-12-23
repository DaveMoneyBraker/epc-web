import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useColorModeContext } from "../../../providers/colorMode";

export const AppColorMode: React.FC = () => {
  const colorMode = useColorModeContext();
  const theme = useTheme();

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
