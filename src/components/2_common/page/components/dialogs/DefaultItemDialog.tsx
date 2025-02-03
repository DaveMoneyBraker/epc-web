import React from "react";
import { Box } from "@mui/material";
import { DefaultDialogItemComponentProps } from "../../../../../types";
import { DialogWrapper } from "../../../../3_shared/dialogs";
import APP_HOOKS from "../../../../../hooks/0_AppHooks";
import { CommonItemForm } from "../../../../3_shared/itemForm";

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
        <CommonItemForm
          state={state}
          errorState={errorState}
          onChange={handleInputChange}
        />
      </Box>
    </DialogWrapper>
  );
};
