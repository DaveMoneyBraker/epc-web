import React from "react";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsEmail: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "email",
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
        keys: ["email"],
        validatorFn: AppInputValidators.validateEmail,
        errorMessage: "Must be valid email (example@gmail.com)",
      },
    ],
  });
  const queryKey = React.useMemo(() => "SuppressionsEmails", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_EMAIL,
    []
  );

  return (
    <CommonPage
      itemName="email"
      queryKey={queryKey}
      apiUrl={apiUrl}
      {...configs}
    />
  );
};
