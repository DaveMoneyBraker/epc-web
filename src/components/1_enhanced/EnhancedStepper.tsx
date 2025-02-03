import React from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  StepperProps,
  styled,
} from "@mui/material";
import { EnhancedButton } from "./EnhancedButton";
import { StepperConfig } from "../../types";

interface Props extends StepperProps {
  configs: StepperConfig;
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

export const EnhancedStepper: React.FC<Props> = ({ configs, ...props }) => {
  const { activeStep, steps, onStepChange } = configs;

  const activeStepCompleted = React.useMemo(
    () => steps[activeStep].completed,
    [steps, activeStep]
  );
  const stepsLength = React.useMemo(() => steps.length, [steps]);

  const handleNext = React.useCallback(() => onStepChange(1), [onStepChange]);
  const handleBack = React.useCallback(() => onStepChange(-1), [onStepChange]);

  return (
    <Wrapper>
      <Stepper activeStep={activeStep} {...props}>
        {steps.map(({ title }, index) => (
          <Step key={`step-${index}`}>
            <StepLabel optional={false}>{title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {steps[activeStep].element}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <EnhancedButton onClick={handleBack} sx={{ mr: 1 }}>
            back
          </EnhancedButton>
          {activeStep + 1 !== stepsLength && (
            <EnhancedButton
              onClick={handleNext}
              disabled={!activeStepCompleted}
            >
              next
            </EnhancedButton>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};
