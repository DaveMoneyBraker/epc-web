import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const BlacklistDomain: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "domain",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "based",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        selectOptions: APP_CONSTANTS.BLACKLIST_DOMAIN_BASED_OPTIONS,
      },
    ],
    validators: [
      {
        keys: ["domain"],
        validatorFn: AppInputValidators.validateSimpleDomain,
        errorMessage: APP_CONSTANTS.ITEM_VALIDATION_ERRORS.SIMPLE_DOMAIN,
      },
      {
        keys: ["domain"],
        validatorFn: AppInputValidators.validateDefaultISPDomain,
        errorMessage: APP_CONSTANTS.ITEM_VALIDATION_ERRORS.DEFAULT_ISP_DOMAIN,
      },
    ],
  });

  return <CommonPage itemName="domain" {...configs} />;
};
