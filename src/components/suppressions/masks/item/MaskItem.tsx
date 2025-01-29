import React from "react";
import { Box, styled } from "@mui/material";
import { SuppressionMask } from "../../../../types";
import { EnhancedSelect, EnhancedTextField } from "../../../1_enhanced";
import APP_CONSTANTS from "../../../../constants/0_AppConstants";

interface Props
  extends Omit<SuppressionMask, "createdAt" | "id" | "updatedAt"> {
  test: string;
  testStatus: null | "valid" | "invalid";
  valid: boolean;
  errorMessage: string;
  onChange: (value: any, key: string) => void;
}

const Wrapper = styled(Box)({
  width: "60%",
  margin: "auto",
  padding: "16px 0",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

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
  const typeOptions = React.useMemo(
    () => APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
    []
  );
  const [message, setMessage] = React.useState("");

  const handleChange = React.useCallback(
    (v: string, key: string) => onChange(v, key),
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
    <Wrapper>
      <EnhancedTextField
        label="Name"
        value={name}
        onChange={(v) => handleChange(v, "name")}
      />
      <EnhancedSelect
        label="Type"
        required
        value={type}
        options={typeOptions}
        onChange={(v) => handleChange(v, "type")}
      />
      <EnhancedTextField
        label="Mask"
        error={!valid}
        helperText={valid ? null : errorMessage}
        value={mask}
        onChange={(v) => handleChange(v, "mask")}
      />
      <EnhancedTextField
        required={false}
        error={!valid || testStatus === "invalid"}
        helperText={message}
        value={test}
        label="Test Your Mask"
        placeholder="test"
        onChange={(v) => handleChange(v, "test")}
        fullWidth
      />
    </Wrapper>
  );
};
