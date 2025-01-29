import React from "react";
import { DefaultPageActions, SuppressionMask } from "../../../types";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { SuppressionMaskItemDialog } from "./item/MaskItemDialog";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsMask: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "name",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        required: true,
      },
      {
        key: "mask",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        required: true,
        excludeFilter: true,
      },
      {
        key: "type",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
        required: true,
      },
    ],
  });

  const queryKey = React.useMemo(() => "SuppressionMask", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_MASK,
    []
  );

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
      actions={actions}
      queryKey={queryKey}
      apiUrl={apiUrl}
      itemDialog={SuppressionMaskItemDialog}
      {...configs}
    />
  );
};
