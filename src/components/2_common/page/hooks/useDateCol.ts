import React from "react";
import APP_UTILS from "../../../../utils/0_AppUtils";
import { DEFAULT_COLUMN_PROPS } from "../constants";

export const useDateCol = () =>
  React.useCallback(
    (colName: string) => ({
      ...DEFAULT_COLUMN_PROPS,
      field: colName,
      headerName: colName,
      valueFormatter: (value: number) => APP_UTILS.formatDate(value),
    }),
    []
  );
