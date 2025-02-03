import React from "react";
import { Box } from "@mui/material";
import { DefaultDialogItemComponentProps } from "../../../../../types";
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
  const { state, errorState, body, handleInputChange, validate } =
    APP_HOOKS.useItemDialogState(selectedItem, itemConfigs, validators);

  const handleDialogClose = React.useCallback(
    (confirm: boolean) => {
      if (confirm) {
        if (!validate()) {
          return;
        }

        return onClose(body);
      }
      onClose(confirm);
    },
    [onClose, validate, body]
  );

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
                    onChange={(v) => handleInputChange(v, i)}
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
                    onChange={(v) => handleInputChange(v, i)}
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
