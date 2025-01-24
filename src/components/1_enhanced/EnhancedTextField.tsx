import React from "react";
import { TextField, TextFieldVariants } from "@mui/material";
import AppHooks from "../../hooks/0_AppHooks";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: "string" | "number";
  variant?: TextFieldVariants;
  fullWidth?: boolean;
  error?: boolean;
  width?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string | null;
  onChange: (v: string) => void;
}

export const EnhancedTextField: React.FC<Props> = ({
  value,
  placeholder = "value",
  label = "Value",
  type = "string",
  fullWidth = true,
  width = fullWidth ? "100%" : "250px",
  variant = "outlined",
  required = true,
  disabled = false,
  error = false,
  helperText = "",
  onChange,
}) => {
  const [firstOpen, setFirstOpen] = React.useState(true);
  const handler = AppHooks.useInputChangeHandler(onChange);
  const handleInputChange = React.useCallback(
    (v: any) => {
      setFirstOpen(false);
      handler(v);
    },
    [handler]
  );
  const requiredError = React.useMemo(
    () => !firstOpen && required && !value,
    [firstOpen, required, value]
  );

  return (
    <TextField
      variant={variant}
      error={error || requiredError}
      required={required}
      helperText={helperText}
      sx={{ width }}
      id={`select-input-id-${label.trim()}`}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={handleInputChange}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
    />
  );
};
