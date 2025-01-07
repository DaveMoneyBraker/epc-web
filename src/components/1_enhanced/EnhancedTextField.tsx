import React from "react";
import { FormControl, SxProps, TextField, Theme } from "@mui/material";
import AppHooks from "../../hooks/0_AppHooks";
import { error } from "console";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: "string" | "number";
  fullWidth?: boolean;
  width?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  onChange: (v: string) => void;
}

export const EnhancedTextField: React.FC<Props> = ({
  value,
  placeholder = "value",
  label = "Value",
  type = "string",
  fullWidth = true,
  width = fullWidth ? "auto" : "250px",
  required = true,
  disabled = false,
  helperText = "",
  onChange,
}) => {
  const handleInputChange = AppHooks.useInputChangeHandler(onChange);
  const error = React.useMemo(() => required && !value, [required, value]);

  return (
    <FormControl fullWidth={fullWidth} required={required}>
      {/* <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel> */}
      <TextField
        error={error}
        required={required}
        helperText={helperText}
        sx={{ width }}
        id={`select-input-id-${label.trim()}`}
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={handleInputChange}
        fullWidth
        disabled={disabled}
        type={type}
      />
    </FormControl>
  );
};
