import React from "react";
import { FilterConfig, ItemConfig, ValidatorConfig } from "../types";

export const useFilteredItemConfigs = (
  configs: FilterConfig[],
  itemNames: string[] = [],
  validatorConfigs?: Omit<ValidatorConfig, "error">[]
) => {
  const itemNamesToSkip = React.useMemo(
    () => [...itemNames, "createdAt", "updatedAt", "deletedAt"],
    [itemNames]
  );

  return React.useMemo<ItemConfig[]>(() => {
    const v = configs.filter(
      ({ itemName }) =>
        !itemNamesToSkip.some((itemNameToSkip) => itemNameToSkip === itemName)
    );
    const validatorConfigsWithError: ValidatorConfig[] = [];
    if (validatorConfigs) {
      validatorConfigs.forEach((validator) =>
        validatorConfigsWithError.push({ ...validator, error: false })
      );
    }
    return v.map((config) => ({
      ...config,
      required: true,
      validators: validatorConfigsWithError,
    }));
  }, [configs, itemNamesToSkip, validatorConfigs]);
};
