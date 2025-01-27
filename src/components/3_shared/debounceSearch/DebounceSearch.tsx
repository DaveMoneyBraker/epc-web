import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import APP_HOOKS from "../../../hooks/0_AppHooks";

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

  const handleChange = APP_HOOKS.useInputChangeHandler(setValue);

  return (
    <TextField
      variant="standard"
      value={value}
      id="debounce_search_input"
      placeholder={itemName}
      onChange={handleChange}
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
