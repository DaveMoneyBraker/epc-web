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
  GridRowId,
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

  const defaultActionsCol = React.useCallback(
    () => ({
      ...defaultColProps,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.1,
      minWidth: 100,
      renderCell: renderActionCol,
    }),
    [defaultColProps, renderActionCol]
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
          newColumn = defaultActionsCol();
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
          };
        }

        newColumns.push({
          ...newColumn,
          headerName: AppUtils.camelToTitleCase(col),
        });
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
