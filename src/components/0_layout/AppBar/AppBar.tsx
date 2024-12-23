import {
  Box,
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { EpcLogoMini } from "../../../assets/icons";
import { AppBarMenu } from "./AppBarMenu";
import { AppColorMode } from "./AppColorMode";

interface Props {
  displayName: string;
  pageTitle: string;
  onClick: () => void;
  onLogout: () => void;
}

export const AppBar: React.FC<Props> = ({
  displayName,
  pageTitle,
  onClick,
  onLogout,
}) => {
  const handleLogout = () => onLogout();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Bar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <EpcLogoMini />
            <Typography variant="h6" sx={{ color: "#fff" }}>
              {pageTitle}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AppColorMode />
            <AppBarMenu displayName={displayName} onLogout={handleLogout} />
          </Box>
        </Toolbar>
      </Bar>
    </Box>
  );
};
