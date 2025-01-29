import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { DialogWrapper } from "../dialogs";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import {
  DefaultDialogItemComponentProps,
  DefaultPageActions,
  DefaultPageProps,
} from "../../../types";
import AppUtils from "../../../utils/0_AppUtils";
import {
  DefaultActionsRow,
  DefaultGridTable,
  DefaultItemDialog,
} from "./components";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

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

export const CommonPage = <T,>({
  itemName,
  actions: propsActions,
  cols,
  filterConfigs,
  itemConfigs,
  validators = [],
  itemDialog: CustomItemDialog,
  queryOptions,
  onEvent,
}: DefaultPageProps<T>) => {
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
  } = APP_HOOKS.useDefaultPageState(itemName, cols, queryOptions);
  const defaultActions = APP_HOOKS.useDefaultPageActions();
  const actions = React.useMemo(
    () => propsActions || defaultActions,
    [defaultActions, propsActions]
  );
  const filteredByPermissionActions =
    APP_HOOKS.useFilteredByPermissionsActions(actions);
  const dialogTitle = React.useMemo(() => {
    const titleCaseItemName = AppUtils.toTitleCase(itemName);
    return selectedItem
      ? `Edit ${titleCaseItemName}`
      : `Create ${titleCaseItemName}`;
  }, [selectedItem, itemName]);
  const itemDialogProps = React.useMemo<DefaultDialogItemComponentProps>(
    () => ({
      open: itemDialogOpen,
      onClose: handleItemDialogClose,
      selectedItem,
      title: dialogTitle,
      itemConfigs,
      validators,
    }),
    [
      dialogTitle,
      handleItemDialogClose,
      itemConfigs,
      itemDialogOpen,
      selectedItem,
      validators,
    ]
  );

  const ItemDialog = React.useMemo(
    () => CustomItemDialog || DefaultItemDialog,
    [CustomItemDialog]
  );

  const handleEvent = React.useCallback(
    (event: DefaultPageActions, body: unknown) => {
      switch (event) {
        case APP_CONSTANTS.PAGE_ACTIONS.EDIT: {
          handleItemDialogBtnClicked(body);
          break;
        }
        case APP_CONSTANTS.PAGE_ACTIONS.DELETE: {
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

      {actions.includes(APP_CONSTANTS.PAGE_ACTIONS.CREATE) && (
        <ItemDialog {...itemDialogProps} />
      )}
    </>
  );
};
