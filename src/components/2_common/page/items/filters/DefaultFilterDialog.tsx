import React from "react";
import { DialogWrapper } from "../../../dialogs";
import {
  COMPARISON_OPERATORS,
  CONDITIONS_OPERATORS,
  FilterConfig,
  FilterValue,
} from "../../../../../types";
import { DefaultFilterRow } from "./DefaultFilterRow";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";

interface Props {
  open: boolean;
  configs: FilterConfig[];
  filterState: FilterValue[];
  onClose: (value?: any) => void;
}

export const DefaultFilterDialog: React.FC<Props> = ({
  open,
  configs,
  filterState,
  onClose,
}) => {
  const [state, setState] = React.useState<FilterValue[]>(filterState);

  const getDefaultRow = React.useCallback((): FilterValue => {
    const config = configs[0];
    return {
      value: "",
      endValue: new Date().toISOString(),
      itemName: config.itemName,
      condition: CONDITIONS_OPERATORS.AND,
      comparison: COMPARISON_OPERATORS.CONT,
    };
  }, [configs]);

  const handleClose = React.useCallback(
    (confirm: boolean) => (confirm ? onClose(state) : onClose(false)),
    [state, onClose]
  );

  const handleAddRow = React.useCallback(() => {
    const v = getDefaultRow();
    setState((prev) => [...prev, v]);
  }, [getDefaultRow]);

  const handleDeleteRow = React.useCallback(
    (index: number) => {
      if (state.length === 1) {
        setState([]);
        onClose([]);
      }
      setState((prev) => prev.filter((f, i) => i !== index));
    },
    [state, onClose]
  );

  const handleFilterChange = React.useCallback(
    (filter: FilterValue, index: number) => {
      setState((prev) => prev.map((v, i) => (i === index ? filter : v)));
    },
    []
  );

  React.useEffect(() => {
    if (state.length === 0) {
      const dr = getDefaultRow();
      setState([dr]);
    }
  }, [state, getDefaultRow]);

  React.useEffect(() => {
    setState(filterState);
  }, [filterState, setState]);

  // DISABLE VALUE INPUT IN CASE IF COMPARISON IS NOT ISNULL/NOTNULL
  // BECAUSE IN THAT CASE WE DON'T NEED VALUE
  const disabled = React.useMemo(
    () =>
      state.some(
        (filter) =>
          (!filter.value &&
            filter.comparison !== COMPARISON_OPERATORS.NOTNULL &&
            filter.comparison !== COMPARISON_OPERATORS.ISNULL) ||
          !filter.condition ||
          !filter.comparison
      ),
    [state]
  );

  return (
    <DialogWrapper
      open={open}
      title="Filters"
      disabled={disabled}
      onClose={handleClose}
      maxWidth="lg"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        {state.map((filter, i) => (
          <DefaultFilterRow
            filter={filter}
            index={i}
            configs={configs}
            key={i}
            onChange={handleFilterChange}
            onDelete={handleDeleteRow}
          />
        ))}
        <IconButton
          sx={{ alignSelf: "flex-start" }}
          color="primary"
          onClick={handleAddRow}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </DialogWrapper>
  );
};
