import React from "react";
import { useSnackbar, VariantType } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import APP_CONSTANTS from "../constants/0_AppConstants";
import { EnhancedIconButton } from "../components/1_enhanced";

export type UseNotification = () => (
  message: string,
  variant?: VariantType
) => void;

export const useNotification: UseNotification = () => {
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
            <EnhancedIconButton
              icon={CloseIcon}
              sx={{ color: "white" }}
              onClick={() => closeSnackbar(key)}
            />
          </React.Fragment>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
};
