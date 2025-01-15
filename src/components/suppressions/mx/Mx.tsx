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
import AppValidators from "../../../validators/0_AppValidators";

export const SuppressionsMx: React.FC = () => {
  const cols = React.useMemo(
    () => ["mx", "type", "updatedAt", "createdAt", "actions"],
    []
  );
  const queryKey = React.useMemo(() => "SuppressionsMx", []);
  const apiUrl = React.useMemo(() => ApiRoutes.SUPPRESSION_MX, []);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "mx" },
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
      forItemName: "mx",
      validatorFn: AppValidators.simpleDomainValidator,
      errorMessage: "Must be valid domain name (domain.com)",
    });
    // CHECK FOR DEFAULT ISP DOMAIN
    values.push({
      forItemName: "mx",
      validatorFn: AppValidators.defaultISPDomainValidator,
      errorMessage: "Can not be default isp (e.g. gmail, yahoo etc.)",
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
      itemName="mx"
      cols={cols}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
    />
  );
};
