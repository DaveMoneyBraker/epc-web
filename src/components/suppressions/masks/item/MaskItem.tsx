import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { SuppressionTypeOptions, SuppressionMask } from "../../../../types";
import { EnhancedSelect, EnhancedTextField } from "../../../1_enhanced";

interface Props
  extends Omit<SuppressionMask, "createdAt" | "id" | "updatedAt"> {
  test: string;
  testStatus: null | "valid" | "invalid";
  valid: boolean;
  errorMessage: string;
  onChange: (key: string, value: any) => void;
}

export const MaskItem: React.FC<Props> = ({
  name,
  mask,
  type,
  test,
  testStatus,
  valid,
  errorMessage,
  onChange,
}) => {
  const typeOptions = SuppressionTypeOptions;
  const [message, setMessage] = React.useState("");

  const handleNameChange = React.useCallback(
    (v: string) => onChange("name", v),
    [onChange]
  );

  const handleMaskChange = React.useCallback(
    (v: string) => onChange("mask", v),
    [onChange]
  );

  const handleTypeChange = React.useCallback(
    (v: string) => onChange("type", v),
    [onChange]
  );

  const handleTestChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      onChange("test", value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (!valid) {
      setMessage("Fix mask first please");
    } else {
      setMessage(() =>
        testStatus === null
          ? ""
          : testStatus === "valid"
          ? "This example will be found by your mask!"
          : "This example will not be found by your mask:("
      );
    }
  }, [valid, testStatus]);

  return (
    <Box
      sx={{
        width: "60%",
        margin: "auto",
        padding: "16px 0",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <EnhancedTextField
        label="Name"
        value={name}
        onChange={handleNameChange}
      />
      <EnhancedSelect
        label="Type"
        required
        value={type}
        options={typeOptions}
        onChange={handleTypeChange}
      />
      <EnhancedTextField
        label="Mask"
        error={!valid}
        helperText={valid ? null : errorMessage}
        value={mask}
        onChange={handleMaskChange}
      />
      <FormControl fullWidth required={false}>
        {/* <InputLabel id={`select-input-id-${label.trim()}`}>{label}</InputLabel> */}
        <TextField
          color={
            testStatus
              ? testStatus === "valid" || !valid
                ? "success"
                : "error"
              : "primary"
          }
          error={!valid || testStatus === "invalid"}
          helperText={message}
          value={test}
          label="Test Your Mask"
          placeholder="test"
          onChange={handleTestChange}
          fullWidth
        />
      </FormControl>
    </Box>
  );
};
