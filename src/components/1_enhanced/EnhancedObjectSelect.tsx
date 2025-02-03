import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

type Props<T> = Omit<SelectProps, "onChange"> & {
  value: T;
  options: T[];
  key: keyof T;
  label?: string;
  onChange: (value: any) => void;
};

export const EnhancedObjectSelect = <T,>({
  value,
  options,
  label = "value",
  key,
  required = false,
  fullWidth = true,
  disabled = false,
  onChange,
  ...props
}: Props<T>) => {
  const {
    config: { inputSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  const [selectedValue, setSelectedValue] = React.useState<T | null>(
    value || null
  );
  const handleChange = React.useCallback(
    (event: any) => {
      const v = event.target.value as string;
      const selectedOption =
        options.find((option) => option[key] === v) || null;
      setSelectedValue(selectedOption);

      if (onChange) {
        onChange(selectedOption);
      }
    },
    [key, onChange, options]
  );

  return (
    <FormControl fullWidth={fullWidth} required={required} disabled={disabled}>
      <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-id-${label.trim()}`}
        value={selectedValue?.[key]}
        label={label}
        {...props}
        onChange={handleChange}
        size={inputSize}
      >
        {options &&
          options.map((option, i) => (
            <MenuItem value={option[key] as string} key={`${option[key]}-${i}`}>
              {String(option[key])}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
