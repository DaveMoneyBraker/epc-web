import React from "react";
import { Box, Button, Step, StepLabel, Stepper, styled } from "@mui/material";

interface Props {
  FirstStep: React.ReactNode;
  firstStepCompleted: boolean;
  SecondStep: React.ReactNode;
  secondStepCompleted: boolean;
  //   thirdStep: React.FC;
  //   thirdStepDisabled: boolean;
  onFirstStepCompleted: () => void;
  onSecondStepCompleted: () => void;
}

const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "calc(100vh - 70px)",
  maxHeight: "calc(100vh - 70px)",
  minHeight: "calc(100vh - 70px)",
  padding: "15px 15px 0px 15px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const FileMapperStepper: React.FC<Props> = ({
  FirstStep,
  firstStepCompleted,
  SecondStep,
  secondStepCompleted,
  onFirstStepCompleted,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = React.useCallback(() => {
    if (activeStep === 0) {
      onFirstStepCompleted();
    }
    setActiveStep((prev) => prev + 1);
  }, [activeStep, setActiveStep, onFirstStepCompleted]);

  const handleBack = React.useCallback(
    () => setActiveStep((prev) => prev - 1),
    [setActiveStep]
  );

  const handleReset = React.useCallback(
    () => setActiveStep(0),
    [setActiveStep]
  );

  const isCurrentStepCompleted = React.useMemo(() => {
    switch (activeStep) {
      case 0: {
        return firstStepCompleted;
      }
      case 1: {
        return secondStepCompleted;
      }
      default: {
        return false;
      }
    }
  }, [activeStep, secondStepCompleted, firstStepCompleted]);

  return (
    <Wrapper>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel optional={false}>Select Files</StepLabel>
        </Step>
        <Step>
          <StepLabel optional={false}>Map Columns</StepLabel>
        </Step>
        <Step>
          <StepLabel optional={false}>Submit Files</StepLabel>
        </Step>
      </Stepper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            overflowY: "scroll",
          }}
        >
          {activeStep === 0 && FirstStep}
          {activeStep === 1 && SecondStep}
          {/* {activeStep === 0 && thirdStep} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isCurrentStepCompleted}
          >
            {activeStep === 2 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};
