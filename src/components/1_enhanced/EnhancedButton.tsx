import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {}

export const EnhancedButton: React.FC<Props> = ({
  size = "small",
  variant = "contained",
  children,
  ...props
}) => {
  return (
    <Button size={size} variant={variant} {...props}>
      {children}
    </Button>
  );
};
