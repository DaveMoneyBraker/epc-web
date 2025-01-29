import { ObjectLiteral } from "./default";
import { ItemConfig } from "../items/itemConfig";
import { DefaultAppItem } from "./defaultAppItem";

export interface DefaultDialogItem extends ObjectLiteral, DefaultAppItem {}

export interface DefaultDialogItemComponentProps<T = DefaultDialogItem | any> {
  open: boolean;
  title: string;
  selectedItem: T;
  configs: ItemConfig[];
  onClose: (value: unknown | null) => void;
}
