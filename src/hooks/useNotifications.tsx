import React from "react";
import { useSnackbar, VariantType } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import APP_CONSTANTS from "../constants/AppConstants";

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return React.useCallback(
    (
      message: string,
      variant: VariantType = APP_CONSTANTS.NOTIFICATION_VARIANTS.DEFAULT
    ) => {
      enqueueSnackbar(message, {
        variant,
        action: (key) => (
          <React.Fragment>
            <IconButton
              sx={{ color: "white" }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
};
