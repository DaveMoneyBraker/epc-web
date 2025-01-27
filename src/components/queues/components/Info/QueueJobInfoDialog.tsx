import React from "react";
import { useStyledDialog as dialogFunction } from "../../../2_common/dialogs";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { EnhancedButton } from "../../../1_enhanced";
import { QueueJob } from "../../../../types";

interface Props {
  job: QueueJob | undefined;
  open: boolean;
  onClose: () => void;
}

const StyledPre = styled("pre")(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  overflowX: "auto",
  "& code": {
    fontFamily: "monospace",
  },
}));

export const QueueJobInfoDialog: React.FC<Props> = ({ open, job, onClose }) => {
  const Dialog = React.useMemo(() => dialogFunction(true), []);
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue),
    [setTabIndex]
  );
  const data = React.useMemo(() => (job ? job.data : {}), [job]);
  const options = React.useMemo(() => (job ? job.opts : {}), [job]);
  const error = React.useMemo(
    () => (job && job.stacktrace.length > 0 ? job.stacktrace : []),
    [job]
  );

  const selectedItem = React.useMemo(() => {
    switch (tabIndex) {
      case 0: {
        return data;
      }
      case 1: {
        return options;
      }
      case 2: {
        return error;
      }
      default:
        return {};
    }
  }, [tabIndex, data, options, error]);

  const formatJson = React.useCallback(
    (obj: any) => (
      <Paper elevation={1}>
        <StyledPre>
          <Typography component="code" variant="body2">
            {JSON.stringify(obj, null, 2)}
          </Typography>
        </StyledPre>
      </Paper>
    ),
    []
  );

  const handleClose = React.useCallback(() => onClose(), [onClose]);
  return (
    <>
      {job && (
        <Dialog
          open={open}
          maxWidth="md"
          scroll="paper"
          onClose={handleClose}
          fullWidth
          //   PaperProps={{
          //     sx: {
          //       height: "60%",
          //     },
          //   }}
        >
          <DialogTitle>
            <Box
              role="toolbar"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Data" />
                <Tab label="Options" />
                <Tab label="Error" />
              </Tabs>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedItem && formatJson(selectedItem)}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-end !important" }}>
            <EnhancedButton onClick={() => handleClose()}>close</EnhancedButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
