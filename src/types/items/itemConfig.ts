import { TitleValueObject } from "../default";
import { FilterConfig, FilterItemType } from "../filters";
import { ValidatorConfig, ValidatorConfigWithNoError } from "./validatorConfig";

export interface ItemConfig extends FilterConfig {
  required: boolean;
  validators: ValidatorConfig[];
  selectOptions?: TitleValueObject[];
}

export interface ItemConfiguration {
  key: string;
  required?: boolean;
  itemType?: FilterItemType;
  selectOptions?: TitleValueObject[];
  excludeFilter?: boolean;
}

export interface PageItemConfigOptions {
  itemConfigs: ItemConfiguration[];
  validators?: ValidatorConfigWithNoError[];
  additionalActions?: boolean;
}

export interface PageColumnConfig {
  key: string;
  filterType?: FilterItemType;
  selectOptions?: TitleValueObject[];
  validators?: ValidatorConfigWithNoError[];
}

export interface PageItemConfig {
  cols: string[]; // Just column keys for table display
  itemConfigs: ItemConfiguration[]; // Configurations for item creation/editing
  filterConfigs: ItemConfiguration[];
  validators: ValidatorConfig[];
}
