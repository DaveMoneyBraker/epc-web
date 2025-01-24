import React from "react";
import { ApiRoutes } from "../../../core/router";
import {
  DefaultPageActions,
  FILTER_ITEM_TYPE,
  FilterConfig,
} from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { SuppressionMaskItemDialog } from "./item/MaskItemDialog";
import { CommonPage } from "../../2_common/page";

export const SuppressionsMask: React.FC = () => {
  const cols = React.useMemo(
    () => ["name", "mask", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsDomains", []);
  const apiUrl = React.useMemo(() => ApiRoutes.SUPPRESSION_MASK, []);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "mask" },
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

  const actions = React.useMemo<DefaultPageActions[]>(
    () => ["create", "edit", "delete"],
    []
  );

  return (
    <CommonPage
      itemName="mask"
      cols={cols}
      actions={actions}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
      itemDialog={SuppressionMaskItemDialog}
    />
  );
};
