import React from "react";
import { FormControl, SxProps, TextField, Theme } from "@mui/material";
import AppHooks from "../../hooks/0_AppHooks";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: "string" | "number";
  fullWidth?: boolean;
  width?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
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
  sx = {},
  onChange,
}) => {
  const handleInputChange = AppHooks.useInputChangeHandler(onChange);

  return (
    <FormControl fullWidth={fullWidth} required={required}>
      {/* <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel> */}
      <TextField
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
