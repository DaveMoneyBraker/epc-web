import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import APP_HOOKS from "../../hooks/0_AppHooks";

type Props = Omit<TextFieldProps, "onChange"> & {
  label?: string;
  width?: string;
  onChange: (v: string) => void;
};

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
  ...props
}) => {
  const [firstOpen, setFirstOpen] = React.useState(true);
  const handler = APP_HOOKS.useInputChangeHandler(onChange);
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
      {...props}
    />
  );
};
