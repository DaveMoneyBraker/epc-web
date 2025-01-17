import { Button } from "@mui/material";
import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { DefaultFilterDialog } from "./DefaultFilterDialog";
import { FilterConfig, FilterValue } from "../../../../../types";

interface Props {
  configs: FilterConfig[];
  filterState: FilterValue[];
  onClose: (value?: FilterValue[]) => void;
}

export const DefaultFilters: React.FC<Props> = ({
  configs,
  filterState,
  onClose,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = React.useCallback(() => setOpen(true), []);
  const handleDialogClose = React.useCallback(
    (f?: FilterValue[]) => {
      onClose(f);
      setOpen(false);
    },
    [onClose]
  );

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
        onClick={handleClick}
      >
        filter
      </Button>
      <DefaultFilterDialog
        open={open}
        configs={configs}
        filterState={filterState}
        onClose={handleDialogClose}
      />
    </>
  );
};
