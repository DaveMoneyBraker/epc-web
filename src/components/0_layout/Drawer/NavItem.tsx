import React from "react";
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavCategoryItem } from "./NavCategoryItem";
import { useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AppNav } from "../../../core/router/nav";

interface Props {
  item: AppNav;
  index: number;
  open: boolean;
  onClick: (index: number) => void;
}

export const NavItem: React.FC<Props> = ({ item, index, open, onClick }) => {
  const { pathname } = useLocation();
  const active = React.useMemo(
    () =>
      item.categories.some(({ children }) =>
        children.some(({ appRoute }) => appRoute === pathname)
      ),
    [pathname, item]
  );

  const handleClick = React.useCallback(() => onClick(index), [index, onClick]);

  return (
    <>
      <ListItemButton onClick={handleClick} dense={true}>
        <ListItemIcon sx={{ color: active ? "#1976D2" : "inherit" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontSize: "14px",
            color: active ? "#1976D2" : "inherit",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {item.title.toUpperCase()}
            {open ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        {item.categories.map((category, i) => (
          <NavCategoryItem category={category} key={i} />
        ))}
      </Collapse>
    </>
  );
};
