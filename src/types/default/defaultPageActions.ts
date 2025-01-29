export type DefaultPageActions =
  | "create"
  | "edit"
  | "delete"
  | "submit"
  | "download";

export type DefaultPageActionsMap = {
  [K in Uppercase<DefaultPageActions>]: Lowercase<K>;
};
