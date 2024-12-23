import { TitleValueObject } from "./default";

export const CONDITIONS_OPERATORS = {
  AND: "AND",
  OR: "OR",
};

export type ConditionOperatorType =
  (typeof CONDITIONS_OPERATORS)[keyof typeof CONDITIONS_OPERATORS];

export const ConditionOperatorsValues: TitleValueObject<ConditionOperatorType>[] =
  [
    { title: CONDITIONS_OPERATORS.AND, value: CONDITIONS_OPERATORS.AND },
    { title: CONDITIONS_OPERATORS.OR, value: CONDITIONS_OPERATORS.OR },
  ];

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

export type ComparisonOperatorType =
  (typeof COMPARISON_OPERATORS)[keyof typeof COMPARISON_OPERATORS];

export interface ComparisonOperator {
  title: string;
  value: ComparisonOperatorType;
}

export const DEFAULT_COMPARISON_OPERATORS: ComparisonOperator[] = [
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

export const UUID_COMPARISON_OPERATORS: ComparisonOperator[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
];

export const DATE_COMPARISON_OPERATORS: ComparisonOperator[] = [
  { title: "greater than", value: COMPARISON_OPERATORS.GT },
  { title: "less than", value: COMPARISON_OPERATORS.LS },
  { title: "greater than or equal to", value: COMPARISON_OPERATORS.GTE },
  { title: "less than or equal to", value: COMPARISON_OPERATORS.LTE },
  { title: "between", value: COMPARISON_OPERATORS.BETWEEN },
];

export const NUMBER_COMPARISON_OPERATORS: ComparisonOperator[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
  { title: "greater than", value: COMPARISON_OPERATORS.GT },
  { title: "less than", value: COMPARISON_OPERATORS.LS },
  { title: "greater than or equal to", value: COMPARISON_OPERATORS.GTE },
  { title: "less than or equal to", value: COMPARISON_OPERATORS.LTE },
];

export const ENUM_COMPARISON_OPERATORS: ComparisonOperator[] = [
  { title: "equal to", value: COMPARISON_OPERATORS.EQ },
  { title: "not equal to", value: COMPARISON_OPERATORS.NE },
];

export const FILTER_ITEM_TYPE = {
  STRING: "string",
  DATE: "date",
  NUMBER: "number",
  ENUM: "enum",
} as const;

export type FilterItemTypes =
  (typeof FILTER_ITEM_TYPE)[keyof typeof FILTER_ITEM_TYPE];

export interface FilterConfig {
  itemType: FilterItemTypes;
  itemName: string;
  selectOptions?: TitleValueObject[];
}

export interface FilterValue<T = string> {
  value: T;
  itemName: string;
  condition: ConditionOperatorType;
  comparison: ComparisonOperatorType;
  endValue: string;
}
