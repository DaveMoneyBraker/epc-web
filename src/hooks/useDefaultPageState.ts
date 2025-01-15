import React from "react";
import { GridSortModel } from "@mui/x-data-grid";
import { useRestQuery } from "./useRestQuery";
import { isSyntheticEvent } from "../typeGuards";
import { useAxiosContext } from "../providers/axios";
import { AppQueryOptions, FilterValue } from "../types";
import AppQueries from "../services/queries/AppQueries";
import AppMutations from "../services/mutations/AppMutations";

interface ReturnedValue<T = any> {
  input: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  sort: {
    value: GridSortModel;
    setValue: React.Dispatch<React.SetStateAction<GridSortModel>>;
  };
  pagination: {
    value: { pageSize: number; page: number };
    setValue: React.Dispatch<
      React.SetStateAction<{ pageSize: number; page: number }>
    >;
  };
  data: {
    value: T[];
    totalItems: number;
    loading: boolean;
  };
  item: {
    selectedItem: T | null;
    itemDialogOpen: boolean;
    deleteDialogOpen: boolean;
    handleItemDialogBtnClicked: (item?: T) => void;
    handleDeleteBtnClicked: (item: T) => void;
    handleItemDialogClose: (item?: T) => void;
    handleDeleteDialogClose: (confirm: boolean) => void;
  };
  filter: {
    value: FilterValue[];
    setValue: React.Dispatch<React.SetStateAction<FilterValue[]>>;
  };
  query: string;
  cols: string[];
}

export const useDefaultPageState = <T = any>(
  itemName: string,
  queryKey: string,
  tableCols: string[],
  apiUrl: string,
  options?: AppQueryOptions<T>
): ReturnedValue<T> => {
  const { loading: axiosLoading } = useAxiosContext();
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [filterValue, setFilterValue] = React.useState<FilterValue[]>([]);
  const [itemDialogOpen, setItemDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const query = useRestQuery({
    itemName,
    inputValue,
    filterValue,
    paginationModel,
    sortModel,
  });
  const {
    data: items,
    totalItems,
    isPending,
  } = AppQueries.usePaginationQuery<T>({
    queryKey,
    apiUrl,
    query,
    options,
  });
  const mutationQuery = AppMutations.useMutationQuery(apiUrl, queryKey);
  // THIS PART WITH COLS LOOK REDUNDANT, BUT IS'S HERE JUST TO NOT
  // INITIALIZE TABLE COLS VIA USE_MEMO IN PARENT COMPONENT EACH TIME
  const cols = React.useMemo(() => [...tableCols], [tableCols]);

  // HANDLING EDIT/CREATE DIALOGS OPEN STATE
  const handleItemDialogBtnClicked = React.useCallback(
    (item?: T): void => {
      // ON CREATE ITEM BTN CLICKED - WE'LL GET CLICK EVENT AS PROP
      const isEvent = isSyntheticEvent(item);
      setSelectedItem(isEvent ? null : (item as T));
      setItemDialogOpen(true);
    },
    [setSelectedItem, setItemDialogOpen]
  );
  const loading = React.useMemo(
    () => axiosLoading || isPending,
    [axiosLoading, isPending]
  );

  // HANDLE CREATE/EDIT DIALOGS CLOSING
  const handleItemDialogClose = React.useCallback(
    (body?: T) => {
      setItemDialogOpen(false);
      if (body) {
        // IF SELECTED ITEM EXIST -> WE SHOULD MAKE PUT(EDIT) REQUEST, ELSE POST(CREATE)
        const method = selectedItem ? "put" : "post";
        mutationQuery.mutate({ method, body });
      }
      setSelectedItem(null);
    },
    [selectedItem, mutationQuery]
  );

  // HANDLE DELETE ITEM DIALOG OPEN STATE
  const handleDeleteBtnClicked = React.useCallback(
    (item: T): void => {
      setSelectedItem(item);
      setDeleteDialogOpen(true);
    },
    [setSelectedItem, setDeleteDialogOpen]
  );

  // HANDLE DELETE ITEM DIALOG CLOSING
  const handleDeleteDialogClose = React.useCallback(
    (confirm: boolean) => {
      setDeleteDialogOpen(false);
      if (confirm) {
        mutationQuery.mutate({ method: "delete", body: selectedItem });
      }
    },
    [mutationQuery, selectedItem, setDeleteDialogOpen]
  );

  // RESET PAGINATION ON SORT, SEARCH OR FILTER
  React.useEffect(() => {
    setPaginationModel((prev) => ({ page: 0, pageSize: prev.pageSize }));
  }, [
    sortModel,
    inputValue,
    filterValue.length,
    paginationModel.pageSize,
    setPaginationModel,
  ]);

  // RESET FILTER VALUE ON INPUT VALUE CHANGE
  React.useEffect(() => {
    setFilterValue([]);
  }, [inputValue, setFilterValue]);

  return React.useMemo(() => {
    const input = {
      value: inputValue,
      setValue: setInputValue,
    };
    const sort = {
      value: sortModel,
      setValue: setSortModel,
    };
    const pagination = {
      value: paginationModel,
      setValue: setPaginationModel,
    };
    const data = { value: items, totalItems, loading };
    const item = {
      selectedItem,
      itemDialogOpen,
      deleteDialogOpen,
      handleItemDialogBtnClicked,
      handleItemDialogClose,
      handleDeleteBtnClicked,
      handleDeleteDialogClose,
    };
    const filter = { value: filterValue, setValue: setFilterValue };
    return { input, sort, pagination, item, query, cols, data, filter };
  }, [
    inputValue,
    setInputValue,
    sortModel,
    setSortModel,
    paginationModel,
    setPaginationModel,
    filterValue,
    setFilterValue,
    query,
    items,
    totalItems,
    loading,
    cols,
    selectedItem,
    itemDialogOpen,
    deleteDialogOpen,
    handleItemDialogBtnClicked,
    handleItemDialogClose,
    handleDeleteBtnClicked,
    handleDeleteDialogClose,
  ]);
};
