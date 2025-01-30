import { Stack, styled } from "@mui/material";
import { DataGrid, DataGridProps, GridPagination } from "@mui/x-data-grid";
import React from "react";
import { NoTableDataMessage } from "../3_shared/noTableDataMessage";
import APP_CONSTANTS from "../../constants/0_AppConstants";

const StyledGridPagination = styled(GridPagination)({
  "&.MuiTablePagination-root": {
    "& .MuiToolbar-root": {
      padding: 0,
    },
  },
});

export const EnhancedDataGrid: React.FC<DataGridProps> = (props) => {
  return (
    <DataGrid
      {...props}
      getRowId={(row) => row.id || row.email}
      paginationMode="server"
      sortingMode="server"
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
