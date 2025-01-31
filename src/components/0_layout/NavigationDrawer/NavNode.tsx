import React from "react";
import { AppNavigationNode } from "../../../types";
import { ListItemButton, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { alpha } from "@mui/material/styles";

interface Props {
  node: AppNavigationNode;
  last: boolean;
}

export const NavNode: React.FC<Props> = ({
  node: { appRoute, title },
  last,
}) => {
  const navigate = useNavigate();
  const {
    primary: { main },
  } = APP_HOOKS.useThemePalette();
  return (
    <ListItemButton
      dense
      sx={(theme) => ({
        ml: 2,
        borderBottom: last
          ? null
          : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: theme.palette.background.default,
        "&:hover": {
          backgroundColor: alpha(theme.palette.divider, 0),
        },
      })}
      onClick={() => navigate(appRoute)}
    >
      <ListItemText
        primaryTypographyProps={{ fontSize: "12px", fontWeight: 500 }}
      >
        <NavLink
          to={appRoute}
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? main : "inherit",
            };
          }}
        >
          {title.toUpperCase()}
        </NavLink>
      </ListItemText>
    </ListItemButton>
  );
};
