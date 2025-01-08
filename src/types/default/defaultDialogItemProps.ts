import { ObjectLiteral } from "./default";
import { ItemConfig } from "../items/itemConfig";

export interface DefaultDialogItemProps<T = ObjectLiteral> {
  open: boolean;
  title: string;
  selectedItem: T;
  configs: ItemConfig[];
  onClose: (value: unknown | null) => void;
}
