import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { TitleValueObject } from "../../types";

interface Props {
  value: string;
  options: TitleValueObject[];
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange: (v: string) => void;
}

export const EnhancedSelect: React.FC<Props> = ({
  value,
  options,
  label = "value",
  required = false,
  fullWidth = true,
  disabled = false,
  onChange,
}) => {
  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      const v = event.target.value as string;
      onChange(v);
    },
    [onChange]
  );

  return (
    <FormControl fullWidth={fullWidth} required={required} disabled={disabled}>
      <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-id-${label.trim()}`}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options &&
          options.map((v, i) => (
            <MenuItem value={v.value} key={i}>
              {v.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
