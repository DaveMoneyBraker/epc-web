import React from "react";
import { ApiRoutes } from "../../../core/router";
import {
  FILTER_ITEM_TYPE,
  FilterConfig,
  ValidatorConfigWithNoError,
} from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppInputValidators from "../../../validators/input/0_InputValidators";

export const SuppressionsDomain: React.FC = () => {
  const cols = React.useMemo(
    () => ["domain", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsDomains", []);
  const apiUrl = React.useMemo(() => ApiRoutes.SUPPRESSION_DOMAIN, []);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "domain" },
      {
        itemType: FILTER_ITEM_TYPE.ENUM,
        itemName: "type",
        selectOptions: SuppressionTypeOptions,
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
      errorMessage: "Must be valid domain name (domain.com)",
    });
    // CHECK FOR DEFAULT ISP DOMAIN
    values.push({
      forItemName: "domain",
      validatorFn: AppInputValidators.validateDefaultISPDomain,
      errorMessage: "Can not be default isp (e.g. gmail, yahoo etc.)",
    });

    return values;
  }, []);

  const itemConfigs = AppHooks.useFilteredItemConfigs(
    filterConfigs,
    [],
    validators
  );
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
    <CommonPage
      itemName="domain"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
      queryOptions={queryOptions}
    />
  );
};
