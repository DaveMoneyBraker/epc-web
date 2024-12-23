export interface ObjectLiteral<T = any> {
  [key: string]: T;
}

export interface TitleValueObject<T = string> {
  title: string;
  value: T;
}
