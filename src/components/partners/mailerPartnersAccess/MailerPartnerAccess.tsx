import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const MailerPartnerAccess: React.FC = () => {
  const mailerPartnersOptions = APP_HOOKS.useMailerPartnerOptions();
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "name",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "accessKey",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "token",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "mailerPartnerId",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.AUTOCOMPLETE,
        selectOptions: mailerPartnersOptions,
        skipTable: true,
      },
    ],
  });

  return <CommonPage itemName="name" dialogItemName="access" {...configs} />;
};
