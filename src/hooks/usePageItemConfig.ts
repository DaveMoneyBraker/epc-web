import React from "react";
import {
  PageItemConfigOptions,
  PageItemConfig,
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
        key: "updatedAt",
        skipFilter: true,
      },
      {
        key: "createdAt",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.DATE,
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
    () => configs.filter((config) => !config.skipFilter),
    [configs]
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
      validators,
    }),
    [filterConfigs, itemConfigs, tableColumns, validators]
  );
};
