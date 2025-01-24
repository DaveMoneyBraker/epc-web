import React from "react";
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";

type Props = Omit<CheckboxProps, "onChange"> & {
  label: string;
  value: boolean;
  fullWidth?: boolean;
  onChange: (value: boolean) => void;
};

export const EnhancedCheckbox: React.FC<Props> = ({
  label,
  value,
  disabled = false,
  fullWidth = true,
  onChange,
  ...props
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.checked),
    [onChange]
  );
  return (
    <FormControl fullWidth={fullWidth} disabled={disabled}>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleChange}
            sx={{ "MuiFormControlLabel-label": { color: "red" } }}
            {...props}
          />
        }
        label={<Typography variant="body3">{label}</Typography>}
      />
    </FormControl>
  );
};
