import { FilterConfig } from "../default/filters";
import { ValidatorConfig } from "./validatorConfig";

export interface ItemConfig extends FilterConfig {
  required: boolean;
  validators: ValidatorConfig[];
}
