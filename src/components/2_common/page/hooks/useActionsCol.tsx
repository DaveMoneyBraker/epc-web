import React from "react";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { DefaultGridTableProps, DefaultPageActions } from "../../../../types";
import { ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DEFAULT_COLUMN_PROPS } from "../constants";
import APP_CONSTANTS from "../../../../constants/0_AppConstants";
import { EnhancedIconButton } from "../../../1_enhanced";

type UseActionsColValue = () => GridColDef;

export const useActionsCol = ({
  onEvent,
  actions = [],
}: Pick<DefaultGridTableProps, "onEvent" | "actions">): UseActionsColValue => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = React.useState<GridRowId | null>(null);
  const filteredActions = React.useMemo(
    () =>
      actions.filter(
        (a) =>
          a !== APP_CONSTANTS.PAGE_ACTIONS.CREATE &&
          a !== APP_CONSTANTS.PAGE_ACTIONS.SUBMIT
      ),
    [actions]
  );

  const handleClick = React.useCallback(
    (id: GridRowId, event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenMenuId(id);
    },
    [setAnchorEl]
  );

  const handleClose = React.useCallback(() => {
    setOpenMenuId(null);
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleMenuClicked = React.useCallback(
    (event: DefaultPageActions, params: GridRenderCellParams) => {
      const { row } = params;
      onEvent(event, row);
      handleClose();
    },
    [onEvent, handleClose]
  );

  const renderActionCol = React.useCallback(
    (params: GridRenderCellParams) => {
      const { id } = params;
      const isOpen = id === openMenuId;
      return (
        <React.Fragment>
          <EnhancedIconButton
            icon={MoreVertIcon}
            aria-controls={isOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            onClick={(e) => handleClick(id, e)}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
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
                aria-label={`${id}-${action}-action_button`}
                key={`${id}-${action}`}
              >
                <ListItemText>{action}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      );
    },
    [
      filteredActions,
      anchorEl,
      openMenuId,
      handleClick,
      handleClose,
      handleMenuClicked,
    ]
  );

  return React.useCallback(
    () => ({
      ...DEFAULT_COLUMN_PROPS,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.1,
      minWidth: 100,
      align: "right",
      renderCell: renderActionCol,
    }),
    [renderActionCol]
  );
};
