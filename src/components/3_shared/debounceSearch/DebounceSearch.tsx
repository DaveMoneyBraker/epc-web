import React from "react";
import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { EnhancedTextField } from "../../1_enhanced";

interface Props {
  onChange: (value: string) => void;
  itemName?: string;
}

export const DebounceSearch: React.FC<Props> = ({
  itemName = "item",
  onChange,
}) => {
  const [value, setValue] = React.useState<string>("");
  APP_HOOKS.useDebounce<string>(onChange, value);

  return (
    <EnhancedTextField
      variant="standard"
      value={value}
      required={false}
      id="debounce_search_input"
      placeholder={itemName}
      onChange={setValue}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
