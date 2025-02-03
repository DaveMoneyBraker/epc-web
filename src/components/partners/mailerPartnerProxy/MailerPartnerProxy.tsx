import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const MailerPartnerProxy: React.FC = () => {
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
        key: "password",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "mailerPartnerId",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        skipFilter: true,
      },
    ],
  });

  return <CommonPage itemName="name" {...configs} />;
};
