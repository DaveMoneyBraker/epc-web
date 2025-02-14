import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import APP_UTILS from "../../utils/0_AppUtils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { EnhancedIconButton } from "./EnhancedIconButton";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

type Props = Omit<TextFieldProps, "onChange"> & {
  label?: string;
  onChange: (value: string) => void;
};

export const EnhancePasswordInput: React.FC<Props> = ({
  value,
  label = "Password",
  onChange,
  ...props
}) => {
  const {
    config: { inputSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const error = React.useMemo(() => !firstOpen && !value, [firstOpen, value]);

  const handleValueChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = APP_UTILS.getInputValue(event);
      setFirstOpen(false);
      onChange(v);
    },
    [onChange]
  );

  const handleMouseDownUpPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleShowToggle = React.useCallback(
    () => setShow((v) => !v),
    [setShow]
  );

  const icon = React.useMemo(() => (show ? VisibilityOff : Visibility), [show]);
  return (
    <TextField
      fullWidth
      required
      error={error}
      variant="standard"
      type={show ? "text" : "password"}
      value={value}
      onChange={handleValueChange}
      label={label}
      placeholder="password"
      slotProps={{
        input: {
          size: inputSize,
          endAdornment: (
            <InputAdornment position="end">
              <EnhancedIconButton
                icon={icon}
                aria-label="toggle password visibility"
                onClick={handleShowToggle}
                onMouseDown={handleMouseDownUpPassword}
                onMouseUp={handleMouseDownUpPassword}
                edge="end"
              />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
