import React from "react";
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { DefaultPageActions } from "../../../../../types";
import { DefaultTableProps } from "../DefaultGridTable";
import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DEFAULT_COLUMN_PROPS } from "../constants";

export const useActionsCol = ({
  onEvent,
  actions = [],
}: Pick<DefaultTableProps, "onEvent" | "actions">) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const opens = React.useMemo(() => new Map(), []);

  const handleClick = React.useCallback(
    (id: GridRowId, event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      // WITHOUT TIMEOUT setAnchorEl DON'T GET TO SETUP ELEMENT
      // WHIT PROVIDE ERROR IN CONSOLE
      setTimeout(() => opens.set(id, true), 0);
    },
    [opens, setAnchorEl]
  );

  const handleClose = React.useCallback(
    (id: GridRowId) => {
      opens.set(id, false);
      setAnchorEl(null);
    },
    [opens, setAnchorEl]
  );

  const handleMenuClicked = React.useCallback(
    (event: DefaultPageActions, params: GridRenderCellParams) => {
      const { id, row } = params;
      onEvent(event, row);
      handleClose(id);
    },
    [onEvent, handleClose]
  );

  const renderActionCol = React.useCallback(
    (params: GridRenderCellParams) => {
      const filteredActions = actions.filter(
        (a) => a !== "create" && a !== "submit"
      );
      const { id } = params;
      if (!opens.has(id)) {
        opens.set(id, false);
      }
      const isOpen = opens.get(id);
      return (
        <>
          <IconButton
            aria-controls={isOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            onClick={(e) => handleClick(id, e)}
            size="small"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => handleClose(id)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              dense: true,
            }}
          >
            {filteredActions.map((action) => (
              <MenuItem
                sx={{
                  minWidth: "100px",
                }}
                onClick={() => handleMenuClicked(action, params)}
                key={`${id}-${action}`}
              >
                <ListItemText>{action}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    },
    [actions, anchorEl, opens, handleClick, handleClose, handleMenuClicked]
  );

  return React.useCallback(
    () => ({
      ...DEFAULT_COLUMN_PROPS,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.1,
      minWidth: 100,
      renderCell: renderActionCol,
    }),
    [renderActionCol]
  );
};
