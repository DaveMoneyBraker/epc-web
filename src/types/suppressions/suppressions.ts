export type SuppressionType =
  | "MANUAL"
  | "DISPOSABLE"
  | "SPAMTRAP"
  | "ABUSE"
  | "UNRECOGNIZED";

export type SuppressionTypeMap = {
  [K in SuppressionType]: K;
};
