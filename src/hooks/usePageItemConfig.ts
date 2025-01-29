import React from "react";
import {
  PageItemConfigOptions,
  PageItemConfig,
  ValidatorConfig,
  ItemConfiguration,
} from "../types";
import APP_CONSTANTS from "../constants/0_AppConstants";

export type UsePageItemConfig = (
  configs: PageItemConfigOptions
) => PageItemConfig;

export const usePageItemConfig: UsePageItemConfig = ({
  itemConfigs: columnConfigs,
  validators = [],
  additionalActions = true,
}) => {
  const excludeKeys = React.useMemo(
    () => ["createdAt", "updatedAt", "deletedAt"],
    []
  );
  const configs = React.useMemo<ItemConfiguration[]>(
    () => [
      ...columnConfigs,
      {
        key: "createdAt",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.DATE,
      },
      {
        key: "updatedAt",
        excludeFilter: true,
      },
    ],
    [columnConfigs]
  );

  // Extract just the column keys for display
  const tableColumns = React.useMemo(() => {
    const cols = [...configs.map((config) => config.key)];
    if (additionalActions) {
      cols.push("actions");
    }
    return cols;
  }, [configs, additionalActions]);

  // Create filter configurations based on column configs
  const filterConfigs = React.useMemo<ItemConfiguration[]>(
    () => configs.filter((config) => !config.excludeFilter),
    [configs]
  );

  // Combine all validators from column configs
  const validatorsWithErrorState = React.useMemo<ValidatorConfig[]>(
    () => [...validators.map((validator) => ({ ...validator, error: false }))],
    [validators]
  );

  // Create item configs by combining filters and validators
  const itemConfigs = React.useMemo<ItemConfiguration[]>(
    () => configs.filter((filter) => !excludeKeys.includes(filter.key)),
    [configs, excludeKeys]
  );

  return React.useMemo(
    () => ({
      cols: tableColumns,
      itemConfigs,
      filterConfigs,
      validators: validatorsWithErrorState,
    }),
    [filterConfigs, itemConfigs, tableColumns, validatorsWithErrorState]
  );
};
