import React from "react";
import {
  FilterConfig,
  ItemConfig,
  PageItemConfigOptions,
  ValidatorConfigWithNoError,
  PageItemConfig,
  PageColumnConfig,
} from "../types";
import APP_CONSTANTS from "../constants/0_AppConstants";

export type UsePageItemConfig = (
  configs: PageItemConfigOptions
) => PageItemConfig;

export const usePageItemConfig: UsePageItemConfig = ({
  columns: columnConfigs,
  requiredFields = [],
  excludeFromFilters: excludeFromFiltersConfigs = [],
  additionalActions = true,
}) => {
  const excludeFromFilters = React.useMemo(
    () => [...excludeFromFiltersConfigs, "updatedAt", "deletedAt"],
    [excludeFromFiltersConfigs]
  );
  //   const columns = React.useMemo<PageColumnConfig[]>(() => ([...columnConfigs,
  //     {
  //         key: 'createdAt',
  //         filterType: APP_CONSTANTS.FILT
  //     }
  //   ]), [columnConfigs]);

  // Extract just the column keys for display
  const tableColumns = React.useMemo(() => {
    const cols = [...columnConfigs.map((col) => col.key), "updatedAt"];
    if (additionalActions) {
      cols.push("actions");
    }
    return cols;
  }, [columnConfigs, additionalActions]);

  // Create filter configurations based on column configs
  const filters = React.useMemo<FilterConfig[]>(() => {
    return columnConfigs
      .filter((col) => !excludeFromFilters.includes(col.key))
      .map((col) => ({
        itemType: col.filterType,
        itemName: col.key,
        selectOptions: col.selectOptions,
      }));
  }, [columnConfigs, excludeFromFilters]);

  // Combine all validators from column configs
  const validators = React.useMemo<ValidatorConfigWithNoError[]>(() => {
    return columnConfigs
      .filter((col) => col.validators && col.validators.length > 0)
      .flatMap((col) => col.validators || []);
  }, [columnConfigs]);

  // Create item configs by combining filters and validators
  const itemConfigs = React.useMemo<ItemConfig[]>(() => {
    return filters.map((filter) => ({
      ...filter,
      required: requiredFields.includes(filter.itemName),
      validators: validators
        .filter((validator) => validator.forItemName === filter.itemName)
        .map((validator) => ({ ...validator, error: false })),
    }));
  }, [filters, validators, requiredFields]);

  return {
    columns: tableColumns,
    filters,
    itemConfigs,
  };
};
