import {
  Breakpoint,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useStyledDialog as styledDialog } from "./useStyledDialog";
import { EnhancedButton, EnhancedIconButton } from "../../1_enhanced";

interface Props {
  open: boolean;
  onClose: (_confirm: boolean) => void;
  title: string;
  disabled: boolean;
  children: React.ReactNode;
  minHeight?: string;
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
  minHeight = "285px",
}) => {
  const Dialog = React.useMemo(
    () => styledDialog(disablePadding, minHeight),
    [disablePadding, minHeight]
  );

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle component={"div"} id="alert-dialog-title">
        <Typography variant="h5">{title}</Typography>
        {withCloseIcon && (
          <EnhancedIconButton icon={CloseIcon} onClick={() => onClose(false)} />
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <EnhancedButton variant="outlined" onClick={() => onClose(false)}>
          {cancelBtnText}
        </EnhancedButton>
        <EnhancedButton onClick={() => onClose(true)} disabled={disabled}>
          Submit
        </EnhancedButton>
      </DialogActions>
    </Dialog>
  );
};
