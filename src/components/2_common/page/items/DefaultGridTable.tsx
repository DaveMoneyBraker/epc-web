import { Stack, styled } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import React from "react";
import { DefaultPageActions } from "../../../../types";
// STYLES
import "./styles/grid-table.scss";
import AppUtils from "../../../../utils/0_AppUtils";
import { NoTableDataMessage } from "../../../3_shared/noTableDataMessage";
import GridTableHooks from "./hooks/0_GridTableHooks";
import { DEFAULT_COLUMN_PROPS } from "./constants";
import APP_CONSTANTS from "../../../../constants/AppConstants";

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

  const defaultActionsCol = GridTableHooks.useActionsCol({ onEvent, actions });

  const defaultDateCol = GridTableHooks.useDateCol();

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
            ...DEFAULT_COLUMN_PROPS,
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
    [defaultActionsCol, setColumns, defaultDateCol]
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
      pageSizeOptions={APP_CONSTANTS.DEFAULT_PAGE_SIZE_OPTIONS}
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
        "& .MuiDataGrid-footerContainer": {
          height: "70px",
          minHeight: "70px",
          maxHeight: "70px",
          overflow: "hidden",
        },
      }}
      slots={{
        noRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <NoTableDataMessage />
          </Stack>
        ),
        pagination: () => (
          <StyledGridPagination showFirstButton={true} showLastButton={true} />
        ),
      }}
    />
  );
};

const StyledGridPagination = styled(GridPagination)({
  "&.MuiTablePagination-root": {
    "& .MuiToolbar-root": {
      padding: 0,
    },
  },
});
