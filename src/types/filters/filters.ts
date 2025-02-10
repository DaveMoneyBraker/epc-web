import { SelectOption } from "../default";

export type ConditionOperator = "AND" | "OR";

export type ConditionOperatorMap = {
  [K in Uppercase<ConditionOperator>]: Uppercase<ConditionOperator>;
};

export type ComparisonOperator =
  | "$eq"
  | "$eqL"
  | "$ne"
  | "$neL"
  | "$gt"
  | "$lt"
  | "$ls"
  | "$gte"
  | "$lte"
  | "$starts"
  | "$ends"
  | "$cont"
  | "$contL"
  | "$excl"
  | "$exclL"
  | "$in"
  | "$inL"
  | "$notin"
  | "$notinL"
  | "$isnull"
  | "$notnull"
  | "$between";

export type ComparisonOperatorMap = {
  [K in Uppercase<ComparisonOperator>]: Lowercase<ComparisonOperator>;
};

export interface ComparisonOperatorOption {
  title: string;
  value: ComparisonOperator;
}

export type FilterItemType =
  | "string"
  | "date"
  | "number"
  | "enum"
  | "autocomplete";

export type FilterItemTypeMap = {
  [K in Uppercase<FilterItemType>]: Lowercase<FilterItemType>;
};

export interface FilterConfig {
  itemType: FilterItemType;
  key: string;
  selectOptions?: SelectOption[];
}

export interface FilterValue<T = string> {
  value: T;
  itemName: string;
  condition: ConditionOperator;
  comparison: ComparisonOperator;
  endValue: string;
}
