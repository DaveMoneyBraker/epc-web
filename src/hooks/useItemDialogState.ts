import React from "react";
import {
  ItemErrorValue,
  ItemConfiguration,
  ItemDialogValue,
  ObjectLiteral,
  ValidatorConfig,
} from "../types";
import { useDefaultItemConfigDialogState } from "./useDefaultItemConfigDialogState";
import { useItemValidation } from "./useItemValidation";

interface UseItemDialogStateReturnValue<T> {
  state: ItemDialogValue[];
  errorState: ItemErrorValue[];
  body: T;
  validate: () => boolean;
  handleInputChange: (value: unknown, i: number) => void;
}

export type UseItemDialogState = <T extends ObjectLiteral>(
  selectedItem: T,
  configs: ItemConfiguration[],
  validators: ValidatorConfig[]
) => UseItemDialogStateReturnValue<T>;

export const useItemDialogState: UseItemDialogState = <T extends ObjectLiteral>(
  selectedItem: T,
  configs: ItemConfiguration[],
  validators: ValidatorConfig[]
) => {
  const defaultState = useDefaultItemConfigDialogState(configs, selectedItem);
  const [state, setState] = React.useState<ItemDialogValue[]>(defaultState);
  const { errorState, validate } = useItemValidation(
    validators,
    configs,
    state
  );
  const keys = React.useMemo(() => configs.map(({ key }) => key), [configs]);
  const body: T = React.useMemo(() => {
    const value = selectedItem ? { ...selectedItem } : ({} as T);

    state.forEach((v) => {
      if (keys.includes(v.key)) {
        value[v.key as keyof T] = v.value as T[keyof T];
      }
    });

    return value;
  }, [keys, selectedItem, state]);

  const handleInputChange = React.useCallback(
    (value: unknown, i: number) => {
      setState((prev) =>
        prev.map((p, index) =>
          index === i
            ? {
                ...p,
                value,
              }
            : p
        )
      );
    },
    [setState]
  );

  React.useEffect(() => {
    // PREVENT UI GLITCHES ON DIALOG CLOSE/OPEN
    setTimeout(() => setState(defaultState), 100);
  }, [defaultState]);

  return React.useMemo(
    () => ({ state, errorState, body, validate, handleInputChange }),
    [body, errorState, handleInputChange, state, validate]
  );
};
