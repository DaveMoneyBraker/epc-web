import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsMx: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "mx",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        required: true,
      },
      {
        key: "type",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
        required: true,
      },
    ],
    validators: [
      {
        keys: ["mx"],
        validatorFn: AppInputValidators.validateSimpleDomain,
        errorMessage: "Must be valid domain name (domain.com)",
      },
      {
        keys: ["mx"],
        validatorFn: AppInputValidators.validateDefaultISPDomain,
        errorMessage: "Can not be default isp (e.g. gmail, yahoo etc.)",
      },
    ],
  });
  const queryKey = React.useMemo(() => "SuppressionsMx", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_MX,
    []
  );

  return (
    <CommonPage
      itemName="mx"
      queryKey={queryKey}
      apiUrl={apiUrl}
      {...configs}
    />
  );
};
