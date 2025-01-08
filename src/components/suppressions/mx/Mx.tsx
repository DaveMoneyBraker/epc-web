import React from "react";
import { ApiRoutes } from "../../../core/router";
import { FILTER_ITEM_TYPE, FilterConfig } from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";

export const SuppressionsMx: React.FC = () => {
  const cols = React.useMemo(
    () => ["mx", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsMx", []);
  const apiUrl = React.useMemo(() => ApiRoutes.SUPPRESSION_MX, []);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "mx" },
      {
        itemType: FILTER_ITEM_TYPE.ENUM,
        itemName: "type",
        selectOptions: SuppressionTypeOptions,
      },
      { itemType: FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );

  const itemConfigs = AppHooks.useFilteredItemConfigs(filterConfigs);

  return (
    <CommonPage
      itemName="mx"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
    />
  );
};
