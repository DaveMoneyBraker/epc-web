import { Button, ButtonProps } from "@mui/material";
import React from "react";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

interface Props extends ButtonProps {}

export const EnhancedButton: React.FC<Props> = ({
  variant = "contained",
  children,
  ...props
}) => {
  const {
    config: { buttonSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  return (
    <Button size={buttonSize} variant={variant} {...props}>
      {children}
    </Button>
  );
};
