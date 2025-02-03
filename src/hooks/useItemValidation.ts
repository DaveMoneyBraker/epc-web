import React from "react";
import {
  ErrorState,
  ItemConfiguration,
  ItemDialogValue,
  ValidatorConfig,
} from "../types";

type ValidateFn = () => boolean;

interface UseItemValidationReturnValue {
  errorState: ErrorState[];
  validate: ValidateFn;
}

export type UseItemValidation = (
  validators: ValidatorConfig[],
  configs: ItemConfiguration[],
  state: ItemDialogValue[]
) => UseItemValidationReturnValue;

export const useItemValidation: UseItemValidation = (
  validators: ValidatorConfig[],
  configs: ItemConfiguration[],
  state: ItemDialogValue[]
) => {
  const [errorState, setErrorState] = React.useState<ErrorState[]>([
    ...configs.map((config) => ({ key: config.key, errorMessages: [] })),
  ]);

  React.useEffect(() => {
    // CLEAR ERRORS ON STATE CHANGE
    setErrorState((prev) => prev.map((err) => ({ ...err, errorMessages: [] })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const validate = React.useCallback((): boolean => {
    let valid = true;
    state.forEach(({ value, key }) => {
      if (validators && validators.length > 0) {
        const relatedValidators = validators.filter((validator) =>
          validator.keys.includes(key)
        );
        relatedValidators.forEach(({ validatorFn, keys, errorMessage }) => {
          if (!validatorFn(value)) {
            valid = false;
            setErrorState((prev) =>
              prev.map((prevErr) => {
                if (keys.includes(key)) {
                  return prevErr.errorMessages.includes(errorMessage)
                    ? prevErr
                    : {
                        ...prevErr,
                        errorMessages: [...prevErr.errorMessages, errorMessage],
                      };
                }
                return prevErr;
              })
            );
          }
        });
      }
    });

    return valid;
  }, [state, validators]);

  return React.useMemo(
    () => ({ errorState, validate }),
    [errorState, validate]
  );
};
