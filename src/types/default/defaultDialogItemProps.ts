import { ObjectLiteral } from "./default";
import { ItemConfiguration } from "../items/itemConfig";
import { DefaultAppItem } from "./defaultAppItem";
import { ValidatorConfig } from "../items";

export interface DefaultDialogItem extends ObjectLiteral, DefaultAppItem {}

export interface DefaultDialogItemComponentProps<T = DefaultDialogItem | any> {
  open: boolean;
  title: string;
  selectedItem: T;
  itemConfigs: ItemConfiguration[];
  validators: ValidatorConfig[];
  onClose: (value: unknown | null) => void;
}
