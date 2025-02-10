import { SelectOption } from "../default";
import { FilterItemType } from "../filters";
import { ValidatorConfig } from "./validatorConfig";

export interface ItemConfiguration {
  key: string;
  required?: boolean;
  itemType?: FilterItemType;
  selectOptions?: SelectOption[];
  skipFilter?: boolean;
  skipTable?: boolean;
}

export interface PageItemConfigOptions {
  itemConfigs: ItemConfiguration[];
  validators?: ValidatorConfig[];
  additionalActions?: boolean;
}

export interface PageColumnConfig {
  key: string;
  filterType?: FilterItemType;
  selectOptions?: SelectOption[];
  validators?: ValidatorConfig[];
}

export interface PageItemConfig {
  cols: string[]; // Just column keys for table display
  itemConfigs: ItemConfiguration[]; // Configurations for item creation/editing
  filterConfigs: ItemConfiguration[];
  validators: ValidatorConfig[];
}
