import { GridColDef } from "@mui/x-data-grid";
import React from "react";

export const useDefaultDataGridColumnProps = () =>
  React.useMemo<Partial<GridColDef>>(
    () => ({
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      minWidth: 150,
    }),
    []
  );
