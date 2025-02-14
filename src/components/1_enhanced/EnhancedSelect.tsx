import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { SelectOption } from "../../types";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

type Props<T = string> = Omit<SelectProps, "onChange"> & {
  value: T;
  options: SelectOption<T>[];
  label?: string;
  onChange: (v: string) => void;
};

export const EnhancedSelect = <T,>({
  value,
  options,
  label = "value",
  required = false,
  fullWidth = true,
  disabled = false,
  onChange,
  ...props
}: Props<T>) => {
  const {
    config: { inputSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
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
        size={inputSize}
      >
        {options &&
          options.map((v, i) => (
            <MenuItem value={v.value as string} key={`${v.value}-${i}`}>
              {v.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
