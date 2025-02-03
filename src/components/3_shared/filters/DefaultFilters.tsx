import { Badge } from "@mui/material";
import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { DefaultFilterDialog } from "./DefaultFilterDialog";
import { FilterValue, ItemConfiguration } from "../../../types";
import { EnhancedButton } from "../../1_enhanced";

interface Props {
  configs: ItemConfiguration[];
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
  const badgeContent = React.useMemo(() => filterState.length, [filterState]);

  return (
    <React.Fragment>
      <Badge badgeContent={badgeContent} color="primary">
        <EnhancedButton
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          onClick={handleClick}
        >
          filter
        </EnhancedButton>
      </Badge>
      <DefaultFilterDialog
        open={open}
        configs={configs}
        filterState={filterState}
        onClose={handleDialogClose}
      />
    </React.Fragment>
  );
};
