export interface ValidatorConfig {
  validatorFn: (value: unknown) => boolean;
  error: boolean;
  errorMessage: string;
  keys: string[];
}

export type ValidatorConfigWithNoError = Omit<ValidatorConfig, "error">;
