import React from "react";
import {
  BlacklistDomainBasedOptions,
  FILTER_ITEM_TYPE,
  FilterConfig,
  ValidatorConfigWithNoError,
} from "../../../types";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";
import APP_CONSTANTS from "../../../constants/AppConstants";

export const BlacklistDomain: React.FC = () => {
  const cols = React.useMemo(
    () => ["domain", "based", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "BlacklistDomains", []);
  const apiUrl = React.useMemo(
    () => APP_CONSTANTS.API_ROUTES.BLACKLIST_DOMAIN,
    []
  );
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "domain" },
      {
        itemType: FILTER_ITEM_TYPE.ENUM,
        itemName: "based",
        selectOptions: BlacklistDomainBasedOptions,
      },
      { itemType: FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );

  const validators = React.useMemo<ValidatorConfigWithNoError[]>(() => {
    const values: ValidatorConfigWithNoError[] = [];
    // SIMPLE DOMAIN (E.G. domain.com) Validator
    values.push({
      forItemName: "domain",
      validatorFn: AppInputValidators.validateSimpleDomain,
      errorMessage: "Should be proper domain name (domain.com)",
    });
    // CHECK FOR DEFAULT ISP DOMAIN
    values.push({
      forItemName: "domain",
      validatorFn: AppInputValidators.validateDefaultISPDomain,
      errorMessage: "Could not be default isp (e.g. gmail, yahoo etc.)",
    });

    return values;
  }, []);

  const itemConfigs = AppHooks.useFilteredItemConfigs(
    filterConfigs,
    [],
    validators
  );

  return (
    <CommonPage
      itemName="domain"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
    />
  );
};
