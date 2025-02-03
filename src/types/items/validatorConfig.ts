export interface ValidatorConfig {
  validatorFn: (value: unknown) => boolean;
  errorMessage: string;
  keys: string[];
}
