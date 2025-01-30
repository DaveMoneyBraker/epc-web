import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { DefaultGridTableProps } from "../../../../../types";
import AppUtils from "../../../../../utils/0_AppUtils";
import { DEFAULT_COLUMN_PROPS } from "../../constants";
import DefaultPageHooks from "../../hooks/0_GridTableHooks";
import { EnhancedDataGrid } from "../../../../1_enhanced";

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
    <EnhancedDataGrid
      rows={data}
      rowCount={rowCount}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      onSortModelChange={onSort}
    />
  );
};
