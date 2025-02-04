import { ItemConfiguration, ValidatorConfig } from "../items";
import { AppQueryOptions } from "../queries";
import {
  DefaultDialogItem,
  DefaultDialogItemComponentProps,
} from "./defaultDialogItemProps";
import { DefaultPageActions } from "./defaultPageActions";

export interface DefaultPageProps<T = DefaultDialogItem> {
  itemName: string;
  dialogItemName?: string;
  cols: string[];
  filterConfigs: ItemConfiguration[];
  itemConfigs: ItemConfiguration[];
  validators?: ValidatorConfig[];
  actions?: DefaultPageActions[];
  queryOptions?: AppQueryOptions;
  onEvent?: (event: DefaultPageActions, body: unknown) => void;
  itemDialog?: React.ComponentType<Partial<DefaultDialogItemComponentProps<T>>>;
}
