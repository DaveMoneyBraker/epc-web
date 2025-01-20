import React from "react";
import AppHooks from "../../../../../hooks/0_AppHooks";
import AppUtils from "../../../../../utils/0_AppUtils";

export const useDateCol = () => {
  // DEFAULT COL CONFIGS
  const defaultColProps = AppHooks.useDefaultDataGridColumnProps();

  return React.useCallback(
    (colName: string) => ({
      ...defaultColProps,
      field: colName,
      headerName: colName,
      valueFormatter: (value: number) => AppUtils.formatDate(value),
    }),
    [defaultColProps]
  );
};
