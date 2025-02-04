import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";
import {
  DefaultPageActions,
  MailerPartnerProxy as MailerPartnerProxyI,
} from "../../../types";

export const MailerPartnerProxy: React.FC = () => {
  const mailerPartnersOptions = APP_HOOKS.useMailerPartnerOptions();
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "name",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "host",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "port",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.NUMBER,
      },
      {
        key: "protocol",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        selectOptions: APP_CONSTANTS.SSL_PROTOCOL_OPTIONS,
      },
      {
        key: "username",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "password",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        skipFilter: true,
      },
      {
        key: "mailerPartnerId",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        selectOptions: mailerPartnersOptions,
        skipFilter: true,
        skipTable: true,
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
    <CommonPage<MailerPartnerProxyI>
      itemName="name"
      dialogItemName="partner proxy"
      actions={actions}
      {...configs}
    />
  );
};
