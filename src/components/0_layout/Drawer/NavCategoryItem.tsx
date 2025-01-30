import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { AppNavCategory, AppNavNode } from "../../../types";

interface Props {
  category: AppNavCategory;
}

export const NavCategoryItem: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();
  const {
    primary: { main: mainColor },
  } = APP_HOOKS.useThemePalette();

  const getItem = React.useCallback(
    (child: AppNavNode, i: number) => (
      <ListItemButton
        dense={true}
        sx={{ pl: 4 }}
        key={`${child.appRoute}-${child.permissionsRoute.default}-${i}`}
        onClick={() => navigate(child.appRoute)}
      >
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          <NavLink
            to={child.appRoute}
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? mainColor : "inherit",
              };
            }}
          >
            {child.title.toUpperCase()}
          </NavLink>
        </ListItemText>
      </ListItemButton>
    ),
    [mainColor, navigate]
  );
  return (
    <React.Fragment>
      <List
        component="div"
        subheader={
          <ListSubheader
            component="div"
            sx={{
              fontWeight: "600",
              borderBottom: 1,
              borderTop: 1,
              borderColor: "divider",
              lineHeight: "32px",
            }}
          >
            {category.title.toUpperCase()}
          </ListSubheader>
        }
      >
        {category.children.map((child, i) => {
          // CLEAR ALL FILES SUBMIT PAGES FROM MENU UI
          const isSubmit = child.appRoute.includes("-submit");
          return isSubmit ? null : getItem(child, i);
        })}
      </List>
    </React.Fragment>
  );
};
