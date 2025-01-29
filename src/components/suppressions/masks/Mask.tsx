import React from "react";
import {
  DefaultPageActions,
  FILTER_ITEM_TYPE,
  FilterConfig,
  SuppressionMask,
} from "../../../types";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { SuppressionMaskItemDialog } from "./item/MaskItemDialog";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsMask: React.FC = () => {
  const cols = React.useMemo(
    () => ["name", "mask", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsDomains", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_MASK,
    []
  );
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "mask" },
      {
        itemType: FILTER_ITEM_TYPE.ENUM,
        itemName: "type",
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
      },
      { itemType: FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );
  const itemConfigs = APP_HOOKS.useFilteredItemConfigs(filterConfigs);

  const defaultActions = APP_HOOKS.useDefaultPageActions();
  const actions = React.useMemo<DefaultPageActions[]>(
    () =>
      defaultActions.filter(
        (action) => action !== APP_CONSTANTS.PAGE_ACTIONS.SUBMIT
      ),
    [defaultActions]
  );

  return (
    <CommonPage<SuppressionMask>
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
