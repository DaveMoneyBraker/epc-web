export interface ValidatorConfig {
  validatorFn: (value: unknown) => boolean;
  error: boolean;
  errorMessage: string;
  forItemName: string;
}

export type ValidatorConfigWithNoError = Omit<ValidatorConfig, "error">;
