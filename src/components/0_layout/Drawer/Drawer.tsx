import React from "react";
import { Drawer, List } from "@mui/material";
import { NavItem } from "./NavItem";
import { useLocation } from "react-router-dom";
import { AppNav } from "../../../types";

interface Props {
  nav: AppNav[];
  open: boolean;
  onClose: () => void;
}

export const AppDrawer: React.FC<Props> = ({ nav, open, onClose }) => {
  const { pathname } = useLocation();
  const [statuses, setStatuses] = React.useState<boolean[]>([]);
  const handleClose = React.useCallback(() => onClose(), [onClose]);

  const toggleCategory = React.useCallback(
    (index: number) =>
      setStatuses((v) => v.map((prev, i) => (i === index ? !prev : false))),
    [setStatuses]
  );

  React.useEffect(() => {
    const newStatuses = new Array(nav.length).fill(false);
    const actNavItemIndex = nav.findIndex(({ categories }) =>
      categories.some(({ children }) =>
        children.some(({ appRoute }) => appRoute === pathname)
      )
    );

    if (actNavItemIndex >= 0) {
      newStatuses[actNavItemIndex] = true;
    }

    setStatuses(() => [...newStatuses]);
  }, [nav, pathname, setStatuses]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ variant: "outlined" }}
    >
      <List
        sx={{
          width: 260,
          maxWidth: 260,
          height: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
      >
        {nav.map((navItem, i) => (
          <NavItem
            item={navItem}
            open={statuses[i] || false}
            index={i}
            key={i}
            onClick={toggleCategory}
          />
        ))}
      </List>
    </Drawer>
  );
};
