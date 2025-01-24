import {
  Breakpoint,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useStyledDialog as styledDialog } from "./useStyledDialog";
import { EnhancedButton } from "../../1_enhanced";

interface Props {
  open: boolean;
  onClose: (_confirm: boolean) => void;
  title: string;
  disabled: boolean;
  children: React.ReactNode;
  maxWidth?: false | Breakpoint | undefined;
  disablePadding?: boolean;
  cancelBtnText?: string;
  withCloseIcon?: boolean;
}

export const DialogWrapper: React.FC<Props> = ({
  title,
  open,
  disabled,
  onClose,
  children,
  maxWidth = "xs",
  disablePadding = false,
  cancelBtnText = "cancel",
  withCloseIcon = true,
}) => {
  const Dialog = React.useMemo(
    () => styledDialog(disablePadding),
    [disablePadding]
  );

  return (
    <Dialog open={open} maxWidth={maxWidth} fullWidth scroll="paper">
      <DialogTitle component={"div"}>
        <Typography variant="h5">{title}</Typography>
        {withCloseIcon && (
          <IconButton size="small" onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <EnhancedButton
          // variant={theme.palette.mode === "light" ? "outlined" : "contained"}
          variant="outlined"
          onClick={() => onClose(false)}
        >
          {cancelBtnText}
        </EnhancedButton>
        <EnhancedButton onClick={() => onClose(true)} disabled={disabled}>
          Submit
        </EnhancedButton>
      </DialogActions>
    </Dialog>
  );
};
