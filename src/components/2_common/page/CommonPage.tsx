import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { DialogWrapper } from "../dialogs";
import AppHooks from "../../../hooks/0_AppHooks";
import {
  AppQueryOptions,
  DefaultDialogItemProps,
  DefaultPageActions,
  FilterConfig,
  ItemConfig,
} from "../../../types";
import AppUtils from "../../../utils/0_AppUtils";
import {
  DefaultActionsRow,
  DefaultGridTable,
  DefaultItemDialog,
} from "./components";

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
  itemDialog?: React.ComponentType<
    Omit<DefaultDialogItemProps<any>, "configs">
  >;
}

const Wrapper = styled("div")(() => ({
  height: "var(--content-height)",
  maxHeight: "var(--content-height)",
  minHeight: "var(--content-height)",
  background: "var(--test)",
  padding: "7px 15px 0px 15px",
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
  itemDialog: ItemDialog,
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
    input: { setValue: setInputValue },
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
          itemName={itemName}
          filterConfigs={filterConfigs}
          filterState={filterState}
          onChange={setInputValue}
          onCreateItem={handleItemDialogBtnClicked}
          onFilersSubmit={setFilterState}
        />
        <Box sx={{ flex: 1, overflow: "hidden", paddingBottom: "5px" }}>
          <DefaultGridTable
            itemName={itemName}
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
        withCloseIcon={false}
        minHeight="fit-content"
      >
        <Typography variant="body1" color="info" id="alert-dialog-description">
          {(selectedItem && selectedItem[itemName]) ||
            "item doesn't found, please try again :("}
        </Typography>
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
