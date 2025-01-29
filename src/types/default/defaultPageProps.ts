import { ItemConfig } from "../items";
import { AppQueryOptions } from "../queries";
import {
  DefaultDialogItem,
  DefaultDialogItemComponentProps,
} from "./defaultDialogItemProps";
import { DefaultPageActions } from "./defaultPageActions";
import { FilterConfig } from "./filters";

export interface DefaultPageProps<T = DefaultDialogItem> {
  itemName: string;
  cols: string[];
  queryKey: string;
  apiUrl: string;
  filterConfigs: FilterConfig[];
  itemConfigs: ItemConfig[];
  actions?: DefaultPageActions[];
  queryOptions?: AppQueryOptions;
  onEvent?: (event: DefaultPageActions, body: unknown) => void;
  itemDialog?: React.ComponentType<Partial<DefaultDialogItemComponentProps<T>>>;
}
