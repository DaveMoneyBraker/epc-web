import React from "react";
import { FormControl, TextField } from "@mui/material";
import AppHooks from "../../hooks/0_AppHooks";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: "string" | "number";
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
  width = fullWidth ? "auto" : "250px",
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
    <FormControl fullWidth={fullWidth} required={required}>
      {/* <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel> */}
      <TextField
        error={error || requiredError}
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
