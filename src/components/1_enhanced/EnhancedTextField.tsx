import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import APP_HOOKS from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/0_AppConstants";

type Props = Omit<TextFieldProps, "onChange"> & {
  width?: string;
  onChange: (v: string) => void;
};

export const EnhancedTextField: React.FC<Props> = ({
  value,
  placeholder = "value",
  type = "string",
  fullWidth = true,
  width = fullWidth ? "100%" : "250px",
  variant = "outlined",
  required = true,
  disabled = false,
  error = false,
  helperText: propsHelperText = "",
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

  const helperText = React.useMemo(() => {
    if (propsHelperText && error) return propsHelperText;
    if (requiredError) return APP_CONSTANTS.ITEM_VALIDATION_ERRORS.REQUIRED;
    return "";
  }, [error, propsHelperText, requiredError]);

  return (
    <TextField
      variant={variant}
      error={error || requiredError}
      required={required}
      helperText={helperText}
      sx={{ width }}
      id={`select-input-id-${placeholder.trim()}`}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      {...props}
    />
  );
};
