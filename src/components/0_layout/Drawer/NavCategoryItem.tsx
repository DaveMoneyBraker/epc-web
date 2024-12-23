import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AppNavCategory, AppNavNode } from "../../../core/router/nav";

interface Props {
  category: AppNavCategory;
}

export const NavCategoryItem: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();

  const getItem = React.useCallback(
    (child: AppNavNode, i: number) => (
      <ListItemButton
        dense={true}
        sx={{ pl: 4 }}
        key={i}
        onClick={() => navigate(child.appRoute)}
      >
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          <NavLink
            to={child.appRoute}
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#1976D2" : "inherit",
              };
            }}
          >
            {child.title.toUpperCase()}
          </NavLink>
        </ListItemText>
      </ListItemButton>
    ),
    [navigate]
  );
  return (
    <>
      <List
        component="div"
        subheader={
          <ListSubheader component="span">
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
    </>
  );
};
