import React from "react";
import { Box, Step, StepLabel, Stepper, styled } from "@mui/material";
import { EnhancedButton } from "../../../1_enhanced";

interface Props {
  activeStep: number;
  onStepChange: (v: 1 | -1) => void;
  firstStep: React.ReactNode;
  firstStepTitle?: string;
  firstStepCompleted: boolean;
  secondStep: React.ReactNode;
  secondStepTitle?: string;
  secondStepCompleted: boolean;
  ThirdStep?: React.ReactNode;
  thirdStepTitle?: string;
}

const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "var(--content-height)",
  maxHeight: "var(--content-height)",
  minHeight: "var(--content-height)",
  padding: "15px 15px 0px 15px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const FileMapperStepper: React.FC<Props> = ({
  activeStep,
  onStepChange,
  firstStep: FirstStep,
  firstStepTitle = "Select Files",
  firstStepCompleted,
  secondStep: SecondStep,
  secondStepTitle = "Map Files",
  secondStepCompleted,
  ThirdStep,
  thirdStepTitle = "Submit Files",
}) => {
  const handleNext = React.useCallback(() => onStepChange(1), [onStepChange]);

  const handleBack = React.useCallback(() => onStepChange(-1), [onStepChange]);

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
          <StepLabel optional={false}>{firstStepTitle}</StepLabel>
        </Step>
        <Step>
          <StepLabel optional={false}>{secondStepTitle}</StepLabel>
        </Step>
        <Step>
          <StepLabel optional={false}>{thirdStepTitle}</StepLabel>
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
          {activeStep === 2 && ThirdStep}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <EnhancedButton
            variant="contained"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            back
          </EnhancedButton>
          {activeStep !== 2 && (
            <EnhancedButton
              variant="contained"
              onClick={handleNext}
              disabled={!isCurrentStepCompleted}
            >
              next
            </EnhancedButton>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};
