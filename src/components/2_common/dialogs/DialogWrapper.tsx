import {
  Box,
  Breakpoint,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useStyledDialog as styledDialog } from "./useStyledDialog";

interface Props {
  open: boolean;
  onClose: (_confirm: boolean) => void;
  title: string;
  disabled: boolean;
  children: React.ReactNode;
  maxWidth?: false | Breakpoint | undefined;
  disablePadding?: boolean;
}

export const DialogWrapper: React.FC<Props> = ({
  title,
  open,
  disabled,
  onClose,
  children,
  maxWidth = "xs",
  disablePadding = false,
}) => {
  const theme = useTheme();
  const Dialog = React.useMemo(
    () => styledDialog(disablePadding),
    [disablePadding]
  );

  return (
    <Dialog open={open} maxWidth={maxWidth} fullWidth scroll="paper">
      <DialogTitle component={"div"}>
        <Typography variant="h5">{title}</Typography>
        <IconButton onClick={() => onClose(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant={theme.palette.mode === "light" ? "outlined" : "contained"}
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onClose(true)}
          disabled={disabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
