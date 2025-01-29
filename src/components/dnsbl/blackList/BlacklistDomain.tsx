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
        required: true,
      },
      {
        key: "based",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        selectOptions: APP_CONSTANTS.BLACKLIST_DOMAIN_BASED_OPTIONS,
        required: true,
      },
    ],
    validators: [
      {
        keys: ["domain"],
        validatorFn: AppInputValidators.validateSimpleDomain,
        errorMessage: "Must be valid domain name (domain.com)",
      },
      {
        keys: ["domain"],
        validatorFn: AppInputValidators.validateDefaultISPDomain,
        errorMessage: "Can not be default isp (e.g. gmail, yahoo etc.)",
      },
    ],
  });

  const queryKey = React.useMemo(() => "BlacklistDomains", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.BLACKLIST_DOMAIN,
    []
  );

  return (
    <CommonPage
      itemName="domain"
      queryKey={queryKey}
      apiUrl={apiUrl}
      {...configs}
    />
  );
};
