import {
  ComparisonOperatorOption,
  ConditionOperator,
  ConditionOperatorMap,
  FilterItemTypeMap,
  SelectOption,
} from "../types";

export const CONDITIONS_OPERATORS: ConditionOperatorMap = {
  AND: "AND",
  OR: "OR",
};

export const CONDITIONS_OPERATOR_VALUES: SelectOption<ConditionOperator>[] = [
  { title: "AND", value: "AND" },
  { title: "OR", value: "OR" },
];

export const FILTER_ITEM_TYPE: FilterItemTypeMap = {
  STRING: "string",
  DATE: "date",
  NUMBER: "number",
  ENUM: "enum",
  AUTOCOMPLETE: "autocomplete",
};

export const COMPARISON_OPERATORS = {
  EQ: "$eq",
  EQL: "$eqL",
  NE: "$ne",
  NEL: "$neL",
  GT: "$gt",
  LT: "$lt",
  LS: "$ls",
  GTE: "$gte",
  LTE: "$lte",
  STARTS: "$starts",
  ENDS: "$ends",
  CONT: "$cont",
  CONTL: "$contL",
  EXCL: "$excl",
  EXCLL: "$exclL",
  IN: "$in",
  INL: "$inL",
  NOTIN: "$notin",
  NOTINL: "$notinL",
  ISNULL: "$isnull",
  NOTNULL: "$notnull",
  BETWEEN: "$between",
} as const;

export const DEFAULT_COMPARISON_OPERATORS: ComparisonOperatorOption[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "equal to (case insensitive)", value: COMPARISON_OPERATORS.EQL },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
  { title: "not equal to (case insensitive)", value: COMPARISON_OPERATORS.NEL },
  { title: "starts with", value: COMPARISON_OPERATORS.STARTS },
  { title: "end with", value: COMPARISON_OPERATORS.ENDS },
  { title: "contain", value: COMPARISON_OPERATORS.CONT },
  { title: "contain (case insensitive)", value: COMPARISON_OPERATORS.CONTL },
  { title: "exclude", value: COMPARISON_OPERATORS.EXCL },
  { title: "exclude (case insensitive)", value: COMPARISON_OPERATORS.EXCLL },
  { title: "include", value: COMPARISON_OPERATORS.IN },
  { title: "include (case insensitive)", value: COMPARISON_OPERATORS.INL },
  { title: "not include", value: COMPARISON_OPERATORS.NOTIN },
  {
    title: "not include (case insensitive)",
    value: COMPARISON_OPERATORS.NOTINL,
  },
  { title: "is null", value: COMPARISON_OPERATORS.ISNULL },
  { title: "not null", value: COMPARISON_OPERATORS.NOTNULL },
];

export const UUID_COMPARISON_OPERATORS: ComparisonOperatorOption[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
];

export const DATE_COMPARISON_OPERATORS: ComparisonOperatorOption[] = [
  { title: "greater than", value: COMPARISON_OPERATORS.GT },
  { title: "less than", value: COMPARISON_OPERATORS.LS },
  { title: "greater than or equal to", value: COMPARISON_OPERATORS.GTE },
  { title: "less than or equal to", value: COMPARISON_OPERATORS.LTE },
  { title: "between", value: COMPARISON_OPERATORS.BETWEEN },
];

export const NUMBER_COMPARISON_OPERATORS: ComparisonOperatorOption[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
  { title: "greater than", value: COMPARISON_OPERATORS.GT },
  { title: "less than", value: COMPARISON_OPERATORS.LS },
  { title: "greater than or equal to", value: COMPARISON_OPERATORS.GTE },
  { title: "less than or equal to", value: COMPARISON_OPERATORS.LTE },
];

export const ENUM_COMPARISON_OPERATORS: ComparisonOperatorOption[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
];
