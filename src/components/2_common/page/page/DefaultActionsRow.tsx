import React from "react";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  styled,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DefaultFilters } from "./filters";
import {
  DefaultPageActions,
  FilterConfig,
  FilterValue,
} from "../../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import AppHooks from "../../../../hooks/0_AppHooks";

const Wrapper = styled("div")(() => ({
  width: "100%",
  minWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "5px 0",
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
  inputValue: string;
  itemName: string;
  filterConfigs: FilterConfig[];
  filterState: FilterValue[];
  onChange: (v: string) => void;
  onCreateItem: () => void;
  onFilersSubmit: (filters: FilterValue[]) => void;
}

export const DefaultActionsRow: React.FC<Props> = ({
  actions,
  inputValue,
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
    () => actions.some((action) => action === "create"),
    [actions]
  );

  const submit = React.useMemo(
    () => actions.some((action) => action === "submit"),
    [actions]
  );

  const submitRoute = React.useMemo(
    () => location.pathname + "-submit",
    [location]
  );

  const handleInputChange = AppHooks.useInputChangeHandler(onChange);

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
    <Wrapper>
      <ElWrapper>
        {create && (
          <Button variant="contained" onClick={handleCreateBtnClicked}>
            Create
          </Button>
        )}
        <FormControl variant="standard">
          <InputLabel htmlFor="search-input">Quick Search</InputLabel>
          <Input
            value={inputValue}
            id="search-input"
            placeholder={itemName}
            onChange={handleInputChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </ElWrapper>
      <ElWrapper>
        <DefaultFilters
          configs={filterConfigs}
          filterState={filterState}
          onClose={handleFiltersDialogClose}
        />
        {submit && (
          <Button variant="contained" onClick={handleGotToSubmitPage}>
            Submit File
          </Button>
        )}
      </ElWrapper>
    </Wrapper>
  );
};
