import React from "react";
import { FormControl, TextField } from "@mui/material";
import AppHooks from "../../hooks/0_AppHooks";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: "string" | "number";
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange: (v: string) => void;
}

export const EnhancedTextField: React.FC<Props> = ({
  value,
  placeholder = "value",
  label = "Value",
  type = "string",
  fullWidth = true,
  required = true,
  disabled = false,
  onChange,
}) => {
  const handleInputChange = AppHooks.useInputChangeHandler(onChange);

  return (
    <FormControl fullWidth={fullWidth} required={required}>
      {/* <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel> */}
      <TextField
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
