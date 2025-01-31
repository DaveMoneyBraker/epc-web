import React from "react";
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavCategory } from "./NavCategory";
import { useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AppNavigationSection } from "../../../types";

interface Props {
  section: AppNavigationSection;
  index: number;
  open: boolean;
  onClick: (index: number) => void;
}

export const NavSection: React.FC<Props> = ({
  section: { title, categories, icon },
  index,
  open,
  onClick,
}) => {
  const { pathname } = useLocation();
  const active = React.useMemo(
    () =>
      categories.some(({ children }) =>
        children.some(({ appRoute }) => appRoute === pathname)
      ),
    [categories, pathname]
  );

  const handleClick = React.useCallback(() => onClick(index), [index, onClick]);

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick} dense>
        <ListItemIcon
          sx={{
            color: active ? "primary.main" : "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontSize: "14px",
            color: active ? "primary.main" : "inherit",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {title.toUpperCase()}
            {open ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        {categories.map((category, i) => (
          <NavCategory category={category} key={`${category.title}-${i}`} />
        ))}
      </Collapse>
    </React.Fragment>
  );
};
