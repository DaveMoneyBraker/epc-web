import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import AppUtils from "../../utils/0_AppUtils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const error = React.useMemo(() => !firstOpen && !value, [firstOpen, value]);

  const handleValueChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = AppUtils.getInputValue(event);
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
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowToggle}
                onMouseDown={handleMouseDownUpPassword}
                onMouseUp={handleMouseDownUpPassword}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
