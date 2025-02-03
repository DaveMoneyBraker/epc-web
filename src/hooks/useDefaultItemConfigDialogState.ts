import React from "react";
import { ItemConfiguration, ItemDialogState, ObjectLiteral } from "../types";

export type UseDefaultItemConfigDialogState = <T = ObjectLiteral>(
  configs: ItemConfiguration[],
  selectedItem?: T
) => ItemDialogState[];

export const useDefaultItemConfigDialogState: UseDefaultItemConfigDialogState =
  <T>(configs: ItemConfiguration[], selectedItem?: T): ItemDialogState[] =>
    React.useMemo(
      () => [
        ...configs.map((config) => ({
          ...config,
          value: selectedItem
            ? selectedItem[config.key as keyof T]
            : config.selectOptions
            ? config.selectOptions[0].value
            : "",
        })),
      ],
      [configs, selectedItem]
    );
