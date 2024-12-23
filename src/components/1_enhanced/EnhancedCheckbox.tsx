import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";

interface Props {
  label: string;
  value: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange: (value: boolean) => void;
}

export const EnhancedCheckbox: React.FC<Props> = ({
  label,
  value,
  disabled = false,
  fullWidth = true,
  onChange,
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
          />
        }
        label={<Typography variant="body3">{label}</Typography>}
      />
    </FormControl>
  );
};
