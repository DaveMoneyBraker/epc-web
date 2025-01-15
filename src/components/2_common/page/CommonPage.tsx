import React from "react";
import { Box, styled } from "@mui/material";
import { DialogWrapper } from "../dialogs";
import AppHooks from "../../../hooks/0_AppHooks";
import { DefaultActionsRow } from "./items/DefaultActionsRow";
import { DefaultGridTable } from "./items/DefaultGridTable";
import {
  AppQueryOptions,
  DefaultDialogItemProps,
  DefaultPageActions,
  FilterConfig,
  ItemConfig,
} from "../../../types";
import { DefaultItemDialog } from "./dialogs";
import AppUtils from "../../../utils/0_AppUtils";

interface Props {
  itemName: string;
  cols: string[];
  queryKey: string;
  apiUrl: string;
  filterConfigs: FilterConfig[];
  itemConfigs: ItemConfig[];
  actions?: DefaultPageActions[];
  queryOptions?: AppQueryOptions;
  onEvent?: (event: DefaultPageActions, body: unknown) => void;
  ItemDialog?: React.ComponentType<
    Omit<DefaultDialogItemProps<any>, "configs">
  >;
}

const Wrapper = styled("div")(() => ({
  height: "calc(100vh - 70px)",
  maxHeight: "calc(100vh - 70px)",
  minHeight: "calc(100vh - 70px)",
  padding: "5px 15px 0px 15px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const CommonPage: React.FC<Props> = ({
  itemName,
  actions = ["create", "edit", "delete", "submit"],
  apiUrl,
  cols,
  queryKey,
  filterConfigs,
  itemConfigs,
  ItemDialog,
  queryOptions,
  onEvent,
}) => {
  const {
    item: {
      selectedItem,
      itemDialogOpen,
      deleteDialogOpen,
      handleItemDialogBtnClicked,
      handleItemDialogClose,
      handleDeleteBtnClicked,
      handleDeleteDialogClose,
    },
    input: { value: inputValue, setValue: setInputValue },
    sort: { setValue: setSortModel },
    pagination: { value: paginationModel, setValue: setPaginationModel },
    filter: { value: filterState, setValue: setFilterState },
    data: { value: items, totalItems, loading },
    cols: defaultStateCols,
  } = AppHooks.useDefaultPageState(
    itemName,
    queryKey,
    cols,
    apiUrl,
    queryOptions
  );
  const filteredByPermissionActions =
    AppHooks.useFilteredByPermissionsActions(actions);
  const dialogTitle = React.useMemo(() => {
    const titleCaseItemName = AppUtils.toTitleCase(itemName);
    return selectedItem
      ? `Edit ${titleCaseItemName}`
      : `Create ${titleCaseItemName}`;
  }, [selectedItem, itemName]);

  const handleEvent = React.useCallback(
    (event: DefaultPageActions, body: unknown) => {
      switch (event) {
        case "edit": {
          handleItemDialogBtnClicked(body);
          break;
        }
        case "delete": {
          handleDeleteBtnClicked(body);
          break;
        }
        default:
          if (onEvent) {
            onEvent(event, body);
          }
          break;
      }
    },
    [handleItemDialogBtnClicked, handleDeleteBtnClicked, onEvent]
  );

  return (
    <>
      <Wrapper>
        <DefaultActionsRow
          actions={filteredByPermissionActions}
          inputValue={inputValue}
          itemName={itemName}
          filterConfigs={filterConfigs}
          filterState={filterState}
          onChange={setInputValue}
          onCreateItem={handleItemDialogBtnClicked}
          onFilersSubmit={setFilterState}
        />
        <Box sx={{ flex: 1, overflow: "scroll" }}>
          <DefaultGridTable
            itemName="domain"
            data={items}
            rowCount={totalItems}
            loading={loading}
            cols={defaultStateCols}
            actions={filteredByPermissionActions}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onSort={setSortModel}
            onEvent={handleEvent}
          />
        </Box>
      </Wrapper>

      {/* DIALOGS */}
      <DialogWrapper
        title="Delete this item from list?"
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        disabled={false}
      >
        Delete {(selectedItem && selectedItem[itemName]) || "item"}?
      </DialogWrapper>
      {ItemDialog ? (
        <ItemDialog
          open={itemDialogOpen}
          onClose={handleItemDialogClose}
          selectedItem={selectedItem}
          title={dialogTitle}
        />
      ) : (
        <DefaultItemDialog
          open={itemDialogOpen}
          onClose={handleItemDialogClose}
          selectedItem={selectedItem}
          title={dialogTitle}
          configs={itemConfigs}
        />
      )}
    </>
  );
};
