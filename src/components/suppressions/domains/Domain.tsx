import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsDomain: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "domain",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "type",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
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

  // EXAMPLE OF QUERY OPTIONS USAGE
  const queryOptions = React.useMemo(
    () => ({
      onSuccess: (item: any) => console.log("onSuccess: ", { item }),
      transform: (item: any) => {
        console.log("transform");
        return item;
      },
      onError: (item: any) => console.log("onError: ", { item }),
    }),
    []
  );

  return (
    <CommonPage itemName="domain" queryOptions={queryOptions} {...configs} />
  );
};
