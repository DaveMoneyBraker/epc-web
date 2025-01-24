export interface StepperConfig {
  activeStep: number;
  steps: Step[];
  onStepChange: (v: 1 | -1) => void;
}

export interface Step {
  element: React.ReactNode;
  completed: boolean;
  title: string;
}
