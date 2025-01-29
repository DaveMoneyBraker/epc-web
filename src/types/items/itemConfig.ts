import { TitleValueObject } from "../default";
import { FilterConfig, FilterItemType } from "../filters";
import { ValidatorConfig, ValidatorConfigWithNoError } from "./validatorConfig";

export interface ItemConfig extends FilterConfig {
  required: boolean;
  validators: ValidatorConfig[];
  selectOptions?: TitleValueObject[];
}

export interface PageItemConfigOptions {
  columns: PageColumnConfig[];
  requiredFields?: string[];
  excludeFromFilters?: string[]; // Column keys to exclude from filters
  additionalActions?: boolean; // Whether to include 'actions' column
}

export interface PageColumnConfig {
  key: string;
  filterType: FilterItemType;
  selectOptions?: TitleValueObject[];
  validators?: ValidatorConfigWithNoError[];
}

export interface PageItemConfig {
  columns: string[]; // Just column keys for table display
  filters: FilterConfig[]; // Configurations for filters
  itemConfigs: ItemConfig[]; // Configurations for item creation/editing
}
