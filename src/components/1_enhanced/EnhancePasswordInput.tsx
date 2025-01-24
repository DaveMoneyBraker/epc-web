import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import AppUtils from "../../utils/0_AppUtils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
  value: string;
  title?: string;
  onChange: (value: string) => void;
}

export const EnhancePasswordInput: React.FC<Props> = ({
  value,
  title = "Password",
  onChange,
}) => {
  const [show, setShow] = React.useState(false);

  const handleValueChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = AppUtils.getInputValue(event);
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
    <FormControl fullWidth required>
      <InputLabel htmlFor="password">{title}</InputLabel>
      <Input
        id="password"
        type={show ? "text" : "password"}
        value={value}
        onChange={handleValueChange}
        placeholder="password"
        endAdornment={
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
        }
      />
    </FormControl>
  );
};
