import React from "react";
import { styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DefaultPageActions,
  FilterValue,
  ItemConfiguration,
} from "../../../../../types";
import { EnhancedButton } from "../../../../1_enhanced";
import { DebounceSearch } from "../../../../3_shared/debounceSearch";
import APP_CONSTANTS from "../../../../../constants/0_AppConstants";
import { DefaultFilters } from "../../../../3_shared/filters";

const Wrapper = styled("div")(() => ({
  width: "100%",
  minWidth: "100%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-between",
  // padding: "15px",
  gap: "15px",
}));

const ElWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "25px",
}));

interface Props {
  actions: DefaultPageActions[];
  itemName: string;
  filterConfigs: ItemConfiguration[];
  filterState: FilterValue[];
  onChange: (v: string) => void;
  onCreateItem: () => void;
  onFilersSubmit: (filters: FilterValue[]) => void;
}

export const DefaultActionsRow: React.FC<Props> = ({
  actions,
  itemName,
  filterConfigs,
  filterState,
  onChange,
  onCreateItem,
  onFilersSubmit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const create = React.useMemo(
    () =>
      actions.some((action) => action === APP_CONSTANTS.PAGE_ACTIONS.CREATE),
    [actions]
  );

  const submit = React.useMemo(
    () =>
      actions.some((action) => action === APP_CONSTANTS.PAGE_ACTIONS.SUBMIT),
    [actions]
  );

  const submitRoute = React.useMemo(
    () => location.pathname + "-submit",
    [location]
  );

  const handleInputChange = React.useCallback(
    (value: string) => onChange(value),
    [onChange]
  );

  const handleFiltersDialogClose = React.useCallback(
    (filters?: FilterValue[]) => {
      if (filters) {
        onFilersSubmit(filters);
      }
    },
    [onFilersSubmit]
  );

  const handleCreateBtnClicked = React.useCallback(
    () => onCreateItem(),
    [onCreateItem]
  );

  const handleGotToSubmitPage = React.useCallback(
    () => navigate(submitRoute),
    [submitRoute, navigate]
  );

  return (
    <Wrapper sx={{ pt: 2, pb: 2, pl: 1, pr: 1 }}>
      <ElWrapper>
        {create && (
          <EnhancedButton onClick={handleCreateBtnClicked}>
            Create
          </EnhancedButton>
        )}
        <DebounceSearch itemName={itemName} onChange={handleInputChange} />
      </ElWrapper>
      <ElWrapper>
        <DefaultFilters
          configs={filterConfigs}
          filterState={filterState}
          onClose={handleFiltersDialogClose}
        />
        {submit && (
          <EnhancedButton onClick={handleGotToSubmitPage}>
            Submit File
          </EnhancedButton>
        )}
      </ElWrapper>
    </Wrapper>
  );
};
