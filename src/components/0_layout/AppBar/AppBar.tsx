import {
  Box,
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBarMenu } from "./AppBarMenu";
import { AppColorMode } from "./AppColorMode";
import { EpcLogo } from "../../4_icons/EpcLogo";

interface Props {
  pageTitle: string;
  onClick: () => void;
  onLogout: () => void;
}

export const AppBar: React.FC<Props> = ({ pageTitle, onClick, onLogout }) => {
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
              alignItems: "flex-end",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                height: "30px",
                width: "87px",
              }}
            >
              <Link
                href="https://epcnetwork.io/"
                target="_blank"
                rel="noopener"
                sx={{ height: "30px" }}
              >
                <EpcLogo />
              </Link>
            </Box>
            {/* <EpcLogo /> */}
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
            <AppBarMenu onLogout={handleLogout} />
          </Box>
        </Toolbar>
      </Bar>
    </Box>
  );
};
