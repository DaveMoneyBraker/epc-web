import React from "react";
import { Drawer, List } from "@mui/material";
import { NavSection } from "./NavSection";
import { useLocation } from "react-router-dom";
import CONTEXT_HOOKS from "../../../providers/0_ContextHooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { pathname } = useLocation();
  const { navigation } = CONTEXT_HOOKS.useCleanedNavigationContext();
  const cleanedNavigation = React.useMemo(
    () =>
      navigation.map((nav) => ({
        ...nav,
        categories: nav.categories.map((category) => ({
          ...category,
          children: category.children.filter(
            (child) => !child.appRoute.includes("-submit")
          ),
        })),
      })),
    [navigation]
  );
  const [statuses, setStatuses] = React.useState<boolean[]>([]);
  const handleClose = React.useCallback(() => onClose(), [onClose]);

  const toggleCategory = React.useCallback(
    (index: number) =>
      setStatuses((v) => v.map((prev, i) => (i === index ? !prev : false))),
    [setStatuses]
  );

  React.useEffect(() => {
    const newStatuses = new Array(cleanedNavigation.length).fill(false);
    const actNavItemIndex = cleanedNavigation.findIndex(({ categories }) =>
      categories.some(({ children }) =>
        children.some(({ appRoute }) => appRoute === pathname)
      )
    );

    if (actNavItemIndex >= 0) {
      newStatuses[actNavItemIndex] = true;
    }

    setStatuses(() => [...newStatuses]);
  }, [cleanedNavigation, pathname, setStatuses]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ variant: "outlined", elevation: 0 }}
    >
      <List
        sx={{
          width: 280,
          maxWidth: 280,
          height: "100%",
          bgcolor: "background.paper",
        }}
        component="div"
      >
        {cleanedNavigation.map((section, i) => (
          <NavSection
            section={section}
            open={statuses[i] || false}
            index={i}
            key={`${section.path}-${i}`}
            onClick={toggleCategory}
          />
        ))}
      </List>
    </Drawer>
  );
};
