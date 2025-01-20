import React from "react";
import AppUtils from "../../../../../utils/0_AppUtils";
import { DEFAULT_COLUMN_PROPS } from "../constants";

export const useDateCol = () =>
  React.useCallback(
    (colName: string) => ({
      ...DEFAULT_COLUMN_PROPS,
      field: colName,
      headerName: colName,
      valueFormatter: (value: number) => AppUtils.formatDate(value),
    }),
    []
  );
