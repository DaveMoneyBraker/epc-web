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
    const vf = (value: unknown) => {
      if (typeof value === "string") {
        return value.includes(".");
      } else {
        return false;
      }
    };
    const errorMessage = "Should be proper domain name (domain.com)";
    return [{ validatorFn: vf, errorMessage, forItemName: "domain" }];
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
