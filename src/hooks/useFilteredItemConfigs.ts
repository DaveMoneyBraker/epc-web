import React from "react";
import { FilterConfig, ItemConfig, ValidatorConfig } from "../types";

export type UseFilteredItemConfigs = (
  configs: FilterConfig[],
  restrictedItemNames?: string[],
  validatorConfigs?: Omit<ValidatorConfig, "error">[]
) => ItemConfig[];

export const useFilteredItemConfigs: UseFilteredItemConfigs = (
  configs: FilterConfig[],
  restrictedItemNames: string[] = [],
  validatorConfigs?: Omit<ValidatorConfig, "error">[]
) => {
  const itemNamesToSkip = React.useMemo(
    () => [...restrictedItemNames, "createdAt", "updatedAt", "deletedAt"],
    [restrictedItemNames]
  );

  return React.useMemo<ItemConfig[]>(() => {
    const v = configs.filter(
      ({ itemName }) =>
        !itemNamesToSkip.some((itemNameToSkip) => itemNameToSkip === itemName)
    );
    // ADD ERROR FIELD TO VALIDATORS IN THIS HOOK
    // SINCE PARENT COMPONENTS DOESN'T CARE ON THIS FIELD AT ALL
    const validatorConfigsWithError: ValidatorConfig[] = [];
    if (validatorConfigs) {
      validatorConfigs.forEach((validator) =>
        validatorConfigsWithError.push({ ...validator, error: false })
      );
    }

    return v.map((config) => ({
      ...config,
      required: true,
      validators: validatorConfigsWithError.filter(
        (vCWE) => vCWE.forItemName === config.itemName
      ),
    }));
  }, [configs, itemNamesToSkip, validatorConfigs]);
};
