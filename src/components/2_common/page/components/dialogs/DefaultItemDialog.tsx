import React from "react";
import { Box } from "@mui/material";
import {
  DefaultDialogItemComponentProps,
  ItemDialogValue,
  ObjectLiteral,
} from "../../../../../types";
import { DialogWrapper } from "../../../../3_shared/dialogs";
import {
  EnhancedSelect,
  EnhancedTextFieldWithErrors,
} from "../../../../1_enhanced";
import APP_CONSTANTS from "../../../../../constants/0_AppConstants";
import APP_HOOKS from "../../../../../hooks/0_AppHooks";

export const DefaultItemDialog: React.FC<DefaultDialogItemComponentProps> = ({
  open,
  title,
  selectedItem,
  itemConfigs,
  validators,
  onClose,
}) => {
  const defaultState = APP_HOOKS.useDefaultItemConfigDialogState(
    itemConfigs,
    selectedItem
  );
  const [state, setState] = React.useState<ItemDialogValue[]>([]);
  const { errorState, validate } = APP_HOOKS.useItemValidation(
    validators,
    itemConfigs,
    state
  );
  const keys = React.useMemo(
    () => itemConfigs.map(({ key }) => key),
    [itemConfigs]
  );

  const handleDialogClose = React.useCallback(
    (confirm: boolean) => {
      if (confirm) {
        if (!validate()) {
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
    [onClose, validate, selectedItem, keys, state]
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
    },
    [setState]
  );

  React.useEffect(() => {
    // TIMEOUT IS FOR PREVENTING UI GLITCHES ON DIALOG CLOSE
    setTimeout(() => setState(defaultState), 100);
  }, [open, selectedItem, defaultState]);

  const disabled = React.useMemo(
    () =>
      // REQUIRED ITEMS ARE MUCH MORE THEN NOT REQUIRED
      // SO TO NOT USE EACH TIME THIS PROPERTY - UNDEFINED MEANS IT REQUIRED
      state.some((v) => (v.required === undefined || v.required) && !v.value),
    [state]
  );

  return (
    <DialogWrapper
      title={title}
      open={open}
      onClose={handleDialogClose}
      disabled={disabled}
      withCloseIcon={false}
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
            ({ key, itemType, value, selectOptions, required = true }, i) => {
              if (
                itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.STRING ||
                itemType === APP_CONSTANTS.FILTER_ITEM_TYPE.NUMBER
              ) {
                const err = errorState.find((e) => e.key === key);
                return (
                  <EnhancedTextFieldWithErrors
                    key={`${key}-${itemType}-${i}`}
                    label={key}
                    value={value as string}
                    onChange={(v) => handleInputChanges(v, i)}
                    fullWidth
                    type={itemType}
                    required={required}
                    errorState={err}
                  />
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
            }
          )}
      </Box>
    </DialogWrapper>
  );
};
