import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { TitleValueObject } from "../../types";

type Props = Omit<SelectProps, "onChange"> & {
  value: string;
  options: TitleValueObject[];
  label?: string;
  onChange: (v: string) => void;
};

export const EnhancedSelect: React.FC<Props> = ({
  value,
  options,
  label = "value",
  required = false,
  fullWidth = true,
  disabled = false,
  onChange,
  ...props
}) => {
  const handleChange = React.useCallback(
    (event: any) => {
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
        {...props}
        onChange={handleChange}
      >
        {options &&
          options.map((v, i) => (
            <MenuItem value={v.value} key={`${v.value}-${i}`}>
              {v.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
