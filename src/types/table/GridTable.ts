import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { DefaultPageActions } from "../default";

export interface DefaultGridTableProps {
  itemName: string;
  data: any[];
  loading: boolean;
  cols: string[];
  actions?: DefaultPageActions[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (_model: GridPaginationModel) => void;
  onSort?: (_model: GridSortModel) => void;
  onEvent: (event: DefaultPageActions, body: unknown) => void;
}
