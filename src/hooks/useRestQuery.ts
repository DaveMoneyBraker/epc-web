import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import React from "react";
import {
  COMPARISON_OPERATORS,
  CONDITIONS_OPERATORS,
  FilterValue,
} from "../types";

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
          (condition === CONDITIONS_OPERATORS.AND ? "&filter=" : "&or=") +
          itemName +
          "__" +
          comparison;
        if (
          comparison !== COMPARISON_OPERATORS.NOTNULL &&
          comparison !== COMPARISON_OPERATORS.ISNULL
        ) {
          f += "__" + value;
        }
        if (
          (itemName === "createdAt" ||
            itemName === "updatedAt" ||
            itemName === "deletedAt") &&
          comparison === COMPARISON_OPERATORS.BETWEEN
        ) {
          f += "," + endValue;
        }
        query += f;
      });
    }

    return query;
  }, [paginationModel, sortModel, inputValue, itemName, filterValue]);
