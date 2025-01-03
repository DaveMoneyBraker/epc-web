import React from "react";
import { ApiRoutes } from "../../../core/router";
import {
  FILTER_ITEM_TYPE,
  FilterConfig,
  ValidatorConfigWithNoError,
} from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import AppValidators from "../../../validators/0_AppValidators";

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
      validatorFn: AppValidators.simpleDomainValidator,
      errorMessage: "Should be proper domain name (domain.com)",
    });
    // CHECK FOR DEFAULT ISP DOMAIN
    values.push({
      forItemName: "domain",
      validatorFn: AppValidators.defaultISPDomainValidator,
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
