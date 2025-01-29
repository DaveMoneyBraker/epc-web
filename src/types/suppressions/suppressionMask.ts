import { DefaultDialogItem } from "../default";
import { SuppressionType } from "./suppressions";

export interface SuppressionMask extends DefaultDialogItem {
  name: string;
  mask: string;
  type: SuppressionType;
}
