import { Stack, styled } from "@mui/material";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import React from "react";
import { DefaultGridTableProps } from "../../../../../types";
import AppUtils from "../../../../../utils/0_AppUtils";
import { NoTableDataMessage } from "../../../../3_shared/noTableDataMessage";
import { DEFAULT_COLUMN_PROPS } from "../../constants";
import APP_CONSTANTS from "../../../../../constants/0_AppConstants";
import DefaultPageHooks from "../../hooks/0_GridTableHooks";

export const DefaultGridTable: React.FC<DefaultGridTableProps> = ({
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

  const actionsCol = DefaultPageHooks.useActionsCol({
    onEvent,
    actions,
  });

  const dateCol = DefaultPageHooks.useDateCol();

  const setupDataGridCols = React.useCallback(
    (columns: string[]) => {
      let newColumns: GridColDef[] = [];
      columns.forEach((col) => {
        let newColumn: GridColDef;
        if (col === "actions" && actions && actions.length > 0) {
          newColumn = actionsCol();
        } else if (
          col === "updatedAt" ||
          col === "createdAt" ||
          col === "deletedAt"
        ) {
          newColumn = dateCol(col);
        } else {
          newColumn = {
            ...DEFAULT_COLUMN_PROPS,
            field: col,
          };
        }

        if (newColumn) {
          newColumns.push({
            ...newColumn,
            headerName: AppUtils.camelToTitleCase(col),
          });
        }
      });
      setColumns(newColumns);
    },
    [actions, actionsCol, setColumns, dateCol]
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
      disableColumnResize
      // DISABLE CELL AND TITLE OUTLINE ON CLICK
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none !important",
          },
        "&.MuiDataGrid-root .MuiDataGrid-cell": { fontSize: "13px" },
        // TO STYLE HEA
        // DER CELLS
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
