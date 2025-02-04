import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";
import { DefaultPageActions } from "../../../types";

export const MailerPartners: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "name",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
    ],
  });

  const defaultActions = APP_HOOKS.useDefaultPageActions();
  const actions = React.useMemo<DefaultPageActions[]>(
    () =>
      defaultActions.filter(
        (action) => action !== APP_CONSTANTS.PAGE_ACTIONS.SUBMIT
      ),
    [defaultActions]
  );

  return (
    <CommonPage
      itemName="name"
      dialogItemName="mailer partner"
      actions={actions}
      {...configs}
    />
  );
};
