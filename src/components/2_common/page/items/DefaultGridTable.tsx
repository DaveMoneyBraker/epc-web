import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DefaultPageActions } from "../../../../types";
// STYLES
import "./styles/grid-table.scss";
import AppUtils from "../../../../utils/0_AppUtils";

export interface DefaultTableProps {
  itemName: string;
  data: any[];
  loading: boolean;
  cols: string[];
  actions?: DefaultPageActions[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (_model: GridPaginationModel) => void;
  onSort?: (_model: GridSortModel) => void;
  onEvent: (event: DefaultPageActions, body: unknown) => void;
}

export const DefaultGridTable: React.FC<DefaultTableProps> = ({
  data,
  actions = [],
  loading,
  cols,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  onSort = () => {},
  onEvent,
}) => {
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  // FOR ACTIONS TABLE CELL
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClicked = React.useCallback(
    (event: DefaultPageActions, body: unknown) => {
      onEvent(event, body);
      handleClose();
    },
    [onEvent]
  );

  // DEFAULT COL CONFIGS
  const defaultColProps: Partial<GridColDef> = React.useMemo(
    () => ({
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      minWidth: 150,
    }),
    []
  );

  const defaultActionsCol = React.useMemo(
    () => ({
      ...defaultColProps,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const filteredActions = actions.filter(
          (a) => a !== "create" && a !== "submit"
        );
        return (
          <>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {filteredActions.map((action) => (
                <MenuItem
                  sx={{
                    minWidth: "100px",
                  }}
                  onClick={() => handleMenuClicked(action, params.row)}
                  key={action}
                >
                  <ListItemText>{action}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
            <div></div>
          </>
        );
      },
    }),
    [actions, anchorEl, open, defaultColProps, handleClick, handleMenuClicked]
  );

  const defaultDateCol = React.useCallback(
    (colName: string) => ({
      ...defaultColProps,
      field: colName,
      headerName: colName,
      valueFormatter: (value: number) => AppUtils.formatDate(value),
    }),
    [defaultColProps]
  );

  const setupDataGridCols = React.useCallback(
    (columns: string[]) => {
      let newColumns: GridColDef[] = [];
      columns.forEach((col) => {
        let newColumn: GridColDef;
        if (col === "actions") {
          newColumn = defaultActionsCol;
        } else if (
          col === "updatedAt" ||
          col === "createdAt" ||
          col === "deletedAt"
        ) {
          newColumn = defaultDateCol(col);
        } else {
          newColumn = {
            ...defaultColProps,
            field: col,
            headerName: AppUtils.camelToTitleCase(col),
          };
        }
        newColumns.push(newColumn);
      });
      setColumns(newColumns);
    },
    [defaultColProps, defaultActionsCol, setColumns, defaultDateCol]
  );

  React.useEffect(() => {
    setupDataGridCols(cols);
  }, [cols, setupDataGridCols]);

  return (
    <DataGrid
      rows={data}
      getRowId={(row) => row.id || row.email}
      rowCount={rowCount}
      columns={columns}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      sortingMode="server"
      onSortModelChange={onSort}
      pageSizeOptions={[10, 50, 100]}
      disableRowSelectionOnClick
      density="compact"
      // DISABLE CELL AND TITLE OUTLINE ON CLICK
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none !important",
          },
        // TO STYLE HEADER CELLS
        // "& .table--header": {
        //   fontWeight: "500",
        //   fontSize: "12px",
        //   lineHeight: "24px",
        // },
        "&.MuiDataGrid-root": {
          overflowX: "auto",
          overflowY: "hidden",
        },
      }}
      slots={{
        noRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            No data
          </Stack>
        ),
        pagination: () => (
          <StyledGridPagination showFirstButton={true} showLastButton={true} />
        ),
      }}
    />
  );
};

const StyledGridPagination = styled(GridPagination)(
  () => `
  &.MuiTablePagination-root {
    & .MuiToolbar-root {
      padding: 0;
    }
  }
`
);
