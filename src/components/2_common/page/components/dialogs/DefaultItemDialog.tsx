import React from "react";
import { Box, Typography } from "@mui/material";
import {
  DefaultDialogItemComponentProps,
  ItemConfiguration,
  ObjectLiteral,
} from "../../../../../types";
import { DialogWrapper } from "../../../../3_shared/dialogs";
import { EnhancedSelect, EnhancedTextField } from "../../../../1_enhanced";
import APP_CONSTANTS from "../../../../../constants/0_AppConstants";

interface DialogState extends ItemConfiguration {
  value: unknown;
}

interface ErrorState {
  key: string;
  errorMessages: string[];
}

export const DefaultItemDialog: React.FC<DefaultDialogItemComponentProps> = ({
  open,
  title,
  selectedItem,
  itemConfigs,
  validators,
  onClose,
}) => {
  const [state, setState] = React.useState<DialogState[]>([
    ...itemConfigs.map((config) => ({
      ...config,
      value: config.selectOptions ? config.selectOptions[0].value : "",
    })),
  ]);
  const [errorState, setErrorState] = React.useState<ErrorState[]>([
    ...itemConfigs.map((config) => ({ key: config.key, errorMessages: [] })),
  ]);
  const keys = React.useMemo(
    () => itemConfigs.map(({ key }) => key),
    [itemConfigs]
  );

  const isValidationFunctionsPassed = React.useCallback((): boolean => {
    let isPassed = true;
    state.forEach(({ value, key }, currentStateIndex) => {
      if (validators && validators.length > 0) {
        const relatedValidators = validators.filter((validator) =>
          validator.keys.includes(key)
        );
        relatedValidators.forEach(({ validatorFn, keys, errorMessage }) => {
          if (!validatorFn(value)) {
            isPassed = false;
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

    return isPassed;
  }, [state, validators]);

  const handleDialogClose = React.useCallback(
    (confirm: boolean) => {
      if (confirm) {
        if (!isValidationFunctionsPassed()) {
          return;
        }
        const body = selectedItem
          ? { id: selectedItem.id }
          : ({} as ObjectLiteral);
        keys.forEach((key) =>
          state.forEach((v) => {
            if (v.key === key) {
              body[key] = v.value;
            }
          })
        );
        return onClose(body);
      }
      onClose(confirm);
    },
    [keys, state, selectedItem, isValidationFunctionsPassed, onClose]
  );

  const defaultConfigMapped = React.useCallback(
    (passedConfigs: ItemConfiguration[]): DialogState[] => [
      ...passedConfigs.map((config) => ({
        ...config,
        value: config.selectOptions ? config.selectOptions[0].value : "",
      })),
    ],
    []
  );

  const proceedStateChanges = React.useCallback(
    (isOpen: boolean) => {
      const defaultState = defaultConfigMapped(itemConfigs);
      if (isOpen && selectedItem) {
        return setState(() =>
          defaultState.map((v) => ({ ...v, value: selectedItem[v.key] }))
        );
      }
      // TIMEOUT IS FOR PREVENTING UI GLITCHES ON DIALOG CLOSE
      setTimeout(() => setState(defaultState), 100);
    },
    [itemConfigs, selectedItem, defaultConfigMapped, setState]
  );

  // ON INPUT CHANGE - REMOVE ALL ERROR MESSAGES
  const handleInputChanges = React.useCallback(
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
      setErrorState((prev) =>
        prev.map((err) => ({ ...err, errorMessages: [] }))
      );
    },
    [setState]
  );

  React.useEffect(() => {
    proceedStateChanges(open);
  }, [open, selectedItem, proceedStateChanges]);

  const disabled = React.useMemo(
    () => state.some((v) => v.required && !v.value),
    [state]
  );

  return (
    <DialogWrapper
      title={title}
      open={open}
      onClose={handleDialogClose}
      disabled={disabled}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {state &&
          state.map(({ key, itemType, value, selectOptions, required }, i) => {
            if (
              itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.STRING ||
              itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.NUMBER
            ) {
              return (
                <div key={`${key}-${itemType}-${i}`}>
                  <EnhancedTextField
                    label={key}
                    value={value as string}
                    onChange={(v) => handleInputChanges(v, i)}
                    fullWidth
                    type={itemType}
                    required={required}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    {errorState
                      .filter((err) => err.key === key)
                      .map(({ errorMessages }) =>
                        errorMessages.map((errorMessage, errorI) => (
                          <Typography
                            variant="inputError"
                            key={`inputError-${errorI}-${i}`}
                          >
                            {errorMessage}
                          </Typography>
                        ))
                      )}
                  </Box>
                </div>
              );
            }
            // FOR ENUM TYPE WE USE SELECT_INPUT ELEMENT
            // SO THERE IS NO POSSIBILITY FOR USER TO MAKE ERROR
            if (itemType === "enum" && selectOptions) {
              return (
                <EnhancedSelect
                  label={key}
                  value={value as string}
                  options={selectOptions}
                  onChange={(v) => handleInputChanges(v, i)}
                  fullWidth
                  required={required}
                  key={`${key}-${itemType}-${i}`}
                />
              );
            }
            return <React.Fragment />;
          })}
      </Box>
    </DialogWrapper>
  );
};
