import { Box, Button, LinearProgress, styled, Typography } from "@mui/material";
import React from "react";
import { EnhancedTextField } from "../../../1_enhanced";
import { useNavigate } from "react-router-dom";
import { AppBackdrop } from "../../../0_layout/Backdrop";

interface Props {
  filename: string;
  mappingComplete: boolean;
  progress: number;
  submitted: boolean;
  error: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onFilenameChange: (value: string) => void;
}

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  width: "100%",
  height: "100%",
  minHeight: "100%",
  maxHeight: "100%",
  "& .MuiBox-root": {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    height: "fit-content",
  },
});

export const FileMapperSubmitFile: React.FC<Props> = ({
  filename,
  mappingComplete,
  progress,
  submitted,
  error,
  onReset,
  onSubmit,
  onFilenameChange,
}) => {
  const navigate = useNavigate();
  const handleFilenameChange = React.useCallback(
    (value: string) => onFilenameChange(value),
    [onFilenameChange]
  );

  const submitInProgress = React.useMemo(
    () => progress > 0 && progress < 100,
    [progress]
  );
  const submit = React.useMemo(
    () => error || (mappingComplete && !submitted && !submitInProgress),
    [error, mappingComplete, submitted, submitInProgress]
  );
  const submitDisabled = React.useMemo(
    () => !filename || !mappingComplete,
    [filename, mappingComplete]
  );

  const handleSubmit = React.useCallback(() => onSubmit(), [onSubmit]);
  const handleReset = React.useCallback(() => onReset(), [onReset]);
  const handleExit = React.useCallback(() => navigate(-1), [navigate]);

  return (
    <Wrapper>
      {!mappingComplete && (
        <Box>
          <AppBackdrop loading={!mappingComplete} />
        </Box>
      )}
      {submit && (
        <Box>
          <EnhancedTextField
            helperText={`not allowed: . , + / \\  ' \` " whitespace`}
            fullWidth={false}
            value={filename}
            onChange={handleFilenameChange}
          />
          <Button
            variant="contained"
            disabled={submitDisabled}
            onClick={handleSubmit}
          >
            {!error ? "Submit" : "Try Again"}
          </Button>
          {error && (
            <Typography sx={{ alignSelf: "center" }} variant="inputError">
              Something goes wrong :(
            </Typography>
          )}
        </Box>
      )}
      {submitInProgress && (
        <Box width="50%">
          <LinearProgress value={progress} variant="determinate" />
        </Box>
      )}
      {submitted && (
        <Box>
          <Button variant="contained" onClick={handleReset}>
            Submit Another File
          </Button>
          <Button variant="contained" onClick={handleExit}>
            Exit
          </Button>
        </Box>
      )}
    </Wrapper>
  );
};