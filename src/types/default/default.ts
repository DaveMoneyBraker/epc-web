export interface ObjectLiteral<T = any> {
  [key: string]: T;
}

export interface SelectOption<T = string> {
  title: string;
  value: T;
}
