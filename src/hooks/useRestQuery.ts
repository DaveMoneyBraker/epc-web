import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import React from "react";
import { FilterValue } from "../types";
import APP_CONSTANTS from "../constants/0_AppConstants";

interface Props {
  inputValue: string;
  itemName: string;
  filterValue: FilterValue[];
  sortModel: GridSortModel;
  paginationModel: GridPaginationModel;
}

export const useRestQuery = ({
  itemName,
  inputValue,
  filterValue,
  sortModel,
  paginationModel,
}: Props): string =>
  React.useMemo(() => {
    let query = "?";
    const { page, pageSize } = paginationModel;

    if ((page || page === 0) && pageSize) {
      query += `page=${page + 1}&limit=${pageSize}`;
    }

    if (sortModel && sortModel.length > 0) {
      sortModel.forEach(({ field, sort }) => {
        if (field && sort) {
          query += `&sort=${field},${sort.toUpperCase()}`;
        }
      });
    }

    if (inputValue) {
      query += `&filter=${itemName}__$cont__${inputValue}`;
    }

    if (filterValue.length > 0) {
      filterValue.forEach((filter) => {
        const { itemName, value, endValue, comparison, condition } = filter;
        let f =
          (condition === APP_CONSTANTS.CONDITIONS_OPERATORS.AND
            ? "&filter="
            : "&or=") +
          itemName +
          "__" +
          comparison;
        if (
          comparison !== APP_CONSTANTS.COMPARISON_OPERATORS.NOTNULL &&
          comparison !== APP_CONSTANTS.COMPARISON_OPERATORS.ISNULL
        ) {
          f += "__" + value;
        }
        if (
          (itemName === "createdAt" ||
            itemName === "updatedAt" ||
            itemName === "deletedAt") &&
          comparison === APP_CONSTANTS.COMPARISON_OPERATORS.BETWEEN
        ) {
          f += "," + endValue;
        }
        query += f;
      });
    }

    return query;
  }, [paginationModel, sortModel, inputValue, itemName, filterValue]);
