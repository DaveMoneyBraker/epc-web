import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {}

export const EnhancedButton: React.FC<Props> = ({
  size = "small",
  variant = "contained",
  children,
  ...otherProps
}) => {
  return (
    <Button size={size} variant={variant} {...otherProps}>
      {children}
    </Button>
  );
};
