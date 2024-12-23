import { ObjectLiteral } from "./default";
import { ItemConfig } from "./itemConfig";

export interface DefaultDialogItemProps {
  open: boolean;
  title: string;
  selectedItem: ObjectLiteral;
  configs: ItemConfig[];
  onClose: (value: unknown | null) => void;
}
