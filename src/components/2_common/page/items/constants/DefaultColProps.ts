import { GridColDef } from "@mui/x-data-grid";

export const DEFAULT_COLUMN_PROPS: Partial<GridColDef> = {
  flex: 1,
  sortable: true,
  disableColumnMenu: true,
  minWidth: 150,
};
