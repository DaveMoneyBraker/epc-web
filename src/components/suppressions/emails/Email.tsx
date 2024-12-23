import React from "react";
import { ApiRoutes } from "../../../core/router";
import { FILTER_ITEM_TYPE, FilterConfig } from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";

export const SuppressionsEmail: React.FC = () => {
  const cols = React.useMemo(
    () => ["email", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsDomains", []);
  const apiUrl = React.useMemo(() => ApiRoutes.SUPPRESSION_EMAIL, []);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "email" },
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
      itemName="email"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
    />
  );
};
