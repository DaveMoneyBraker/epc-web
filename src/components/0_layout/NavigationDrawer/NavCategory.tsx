import React from "react";
import { List, ListSubheader } from "@mui/material";
import { AppNavigationCategory } from "../../../types";
import { NavNode } from "./NavNode";

interface Props {
  category: AppNavigationCategory;
}

export const NavCategory: React.FC<Props> = ({
  category: { children, title },
}) => {
  return (
    <React.Fragment>
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader
            component="div"
            sx={{
              fontWeight: "600",
              borderBottom: 1,
              borderTop: 1,
              borderColor: "divider",
              lineHeight: "32px",
              // pl: 2,
            }}
          >
            {title.toUpperCase()}
          </ListSubheader>
        }
        sx={(theme) => ({ background: theme.palette.divider })}
      >
        {children.map((node, i) => (
          <NavNode
            key={`${node.appRoute}-${node.permissionsRoute.default}-${i}`}
            node={node}
            last={i + 1 === children.length}
          />
        ))}
      </List>
    </React.Fragment>
  );
};
