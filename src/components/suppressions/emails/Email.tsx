import React from "react";
import { FilterConfig, ValidatorConfigWithNoError } from "../../../types";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const SuppressionsEmail: React.FC = () => {
  const cols = React.useMemo(
    () => ["email", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsDomains", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.SUPPRESSION_EMAIL,
    []
  );
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING, itemName: "email" },
      {
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.ENUM,
        itemName: "type",
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
      },
      { itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );

  const validators = React.useMemo<ValidatorConfigWithNoError[]>(() => {
    const values: ValidatorConfigWithNoError[] = [];
    // SIMPLE DOMAIN (E.G. domain.com) Validator
    values.push({
      forItemName: "email",
      validatorFn: AppInputValidators.validateEmail,
      errorMessage: "Must be valid email (example@gmail.com)",
    });
    // CHECK FOR DEFAULT ISP DOMAIN

    return values;
  }, []);

  const itemConfigs = APP_HOOKS.useFilteredItemConfigs(
    filterConfigs,
    [],
    validators
  );

  return (
    <CommonPage
      itemName="email"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
    />
  );
};
