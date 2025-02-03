import React from "react";
import { ItemConfiguration, ItemDialogValue, ObjectLiteral } from "../types";

export type UseDefaultItemConfigDialogState = <T = ObjectLiteral>(
  configs: ItemConfiguration[],
  selectedItem?: T
) => ItemDialogValue[];

export const useDefaultItemConfigDialogState: UseDefaultItemConfigDialogState =
  <T>(configs: ItemConfiguration[], selectedItem?: T): ItemDialogValue[] =>
    React.useMemo(
      () => [
        ...configs.map((config) => ({
          ...config,
          value: selectedItem
            ? selectedItem[config.key as keyof T]
            : config.selectOptions
            ? config.selectOptions.length
              ? config.selectOptions[0].value
              : ""
            : "",
        })),
      ],
      [configs, selectedItem]
    );
