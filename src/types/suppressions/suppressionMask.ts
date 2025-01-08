import { DefaultAppItem } from "../default/defaultAppItem";
import { SuppressionType } from "./suppressions";

export interface SuppressionMask extends DefaultAppItem {
  name: string;
  mask: string;
  type: SuppressionType;
}
