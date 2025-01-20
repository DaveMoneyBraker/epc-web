import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {}

export const EnhancedButton: React.FC<Props> = ({
  size = "small",
  children,
  ...otherProps
}) => {
  return (
    <Button size={size} {...otherProps}>
      {children}
    </Button>
  );
};
