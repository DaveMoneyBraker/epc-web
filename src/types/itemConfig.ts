import { FilterConfig } from "./filters";

export interface ItemConfig extends FilterConfig {
  required: boolean;
  validators: ValidatorConfig[];
}

export interface ValidatorConfig {
  validatorFn: (value: unknown) => boolean;
  error: boolean;
  errorMessage: string;
  forItemName: string;
}

export type ValidatorConfigWithNoError = Omit<ValidatorConfig, "error">;
