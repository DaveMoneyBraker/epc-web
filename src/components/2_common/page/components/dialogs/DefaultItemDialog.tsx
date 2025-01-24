import React from "react";
import { Box, Typography } from "@mui/material";
import {
  DefaultDialogItemProps,
  ItemConfig,
  ObjectLiteral,
} from "../../../../../types";
import { DialogWrapper } from "../../../dialogs";
import { EnhancedSelect, EnhancedTextField } from "../../../../1_enhanced";

interface DialogState extends ItemConfig {
  value: unknown;
}

export const DefaultItemDialog: React.FC<DefaultDialogItemProps> = ({
  open,
  title,
  selectedItem,
  configs,
  onClose,
}) => {
  const [state, setState] = React.useState<DialogState[]>([
    ...configs.map((config) => ({
      ...config,
      value: config.selectOptions ? config.selectOptions[0].value : "",
    })),
  ]);
  const keys = React.useMemo(
    () => configs.map(({ itemName }) => itemName),
    [configs]
  );

  const isValidationFunctionsPassed = React.useCallback((): boolean => {
    let isPassed = true;
    state.forEach(({ validators, value, itemName }, currentStateIndex) => {
      if (validators && validators.length > 0) {
        validators.forEach(
          ({ validatorFn, forItemName }, currentValidatorIndex) => {
            if (forItemName === itemName && !validatorFn(value)) {
              isPassed = false;
              setState((prev) =>
                prev.map((p, pI) =>
                  pI === currentStateIndex
                    ? {
                        ...p,
                        validators: p.validators.map(
                          (prevValidator, prevValidatorIndex) =>
                            prevValidatorIndex === currentValidatorIndex
                              ? { ...prevValidator, error: true }
                              : prevValidator
                        ),
                      }
                    : p
                )
              );
            }
          }
        );
      }
    });

    return isPassed;
  }, [state]);

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
            if (v.itemName === key) {
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
    (passedConfigs: ItemConfig[]): DialogState[] => [
      ...passedConfigs.map((config) => ({
        ...config,
        value: config.selectOptions ? config.selectOptions[0].value : "",
        error: false,
      })),
    ],
    []
  );

  const proceedStateChanges = React.useCallback(
    (isOpen: boolean) => {
      const defaultState = defaultConfigMapped(configs);
      if (isOpen && selectedItem) {
        return setState(() =>
          defaultState.map((v) => ({ ...v, value: selectedItem[v.itemName] }))
        );
      }
      // TIMEOUT IS FOR PREVENTING UI GLITCHES ON DIALOG CLOSE
      setTimeout(() => setState(defaultState), 100);
    },
    [configs, selectedItem, defaultConfigMapped, setState]
  );

  // ON INPUT CHANGE - REMOVE ALL ERROR MESSAGES
  const handleInputChanges = React.useCallback(
    (value: unknown, i: number) =>
      setState((prev) =>
        prev.map((p, index) =>
          index === i
            ? {
                ...p,
                value,
                validators: p.validators
                  ? p.validators.map((validator) => ({
                      ...validator,
                      error: false,
                    }))
                  : [],
              }
            : p
        )
      ),
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
          state.map(
            (
              {
                itemName,
                itemType,
                value,
                selectOptions,
                required,
                validators,
              },
              i
            ) => {
              if (itemType === "string" || itemType === "number") {
                return (
                  <div key={i}>
                    <EnhancedTextField
                      label={itemName}
                      value={value as string}
                      onChange={(v) => handleInputChanges(v, i)}
                      fullWidth
                      type={itemType}
                      required={required}
                    />
                    {validators &&
                      validators.map(
                        ({ error, errorMessage }, errorI) =>
                          error && (
                            <Typography variant="inputError" key={errorI}>
                              {errorMessage}
                            </Typography>
                          )
                      )}
                  </div>
                );
              }
              // FOR ENUM TYPE WE USE SELECT_INPUT ELEMENT
              // SO THERE IS NO POSSIBILITY FOR USER TO MAKE ERROR
              if (itemType === "enum" && selectOptions) {
                return (
                  <EnhancedSelect
                    label={itemName}
                    value={value as string}
                    options={selectOptions}
                    onChange={(v) => handleInputChanges(v, i)}
                    fullWidth
                    required={required}
                    key={i}
                  />
                );
              }
              return <></>;
            }
          )}
      </Box>
    </DialogWrapper>
  );
};
