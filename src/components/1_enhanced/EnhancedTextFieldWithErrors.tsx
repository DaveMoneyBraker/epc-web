import React from "react";
import { EnhancedTextField } from "./EnhancedTextField";
import { TextFieldProps } from "@mui/material";
import { ItemErrorValue } from "../../types";

type Props = Omit<TextFieldProps, "onChange"> & {
  label?: string;
  width?: string;
  onChange: (v: string) => void;
  errorState?: ItemErrorValue;
};

export const EnhancedTextFieldWithErrors: React.FC<Props> = ({
  errorState,
  ...props
}) => {
  const error = React.useMemo(
    () => errorState && errorState.errorMessages.length > 0,
    [errorState]
  );

  const helperText = React.useMemo(
    () =>
      errorState &&
      errorState.errorMessages.reduce(
        (prev, curr, i) => (i === 0 ? prev + curr : prev + " " + curr),
        ""
      ),
    [errorState]
  );
  return <EnhancedTextField error={error} helperText={helperText} {...props} />;
};
