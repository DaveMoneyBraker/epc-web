import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import CONTEXT_HOOKS from "../../providers/0_ContextHooks";

interface Props extends Omit<IconButtonProps, "children"> {
  icon: React.ComponentType<SvgIconProps>;
}

export const EnhancedIconButton: React.FC<Props> = ({
  icon: Icon,
  ...props
}) => {
  const {
    config: { buttonSize, iconFontSize },
  } = CONTEXT_HOOKS.useUiConfigContext();
  return (
    <IconButton {...props} size={buttonSize}>
      <Icon sx={{ fontSize: iconFontSize }} />
    </IconButton>
  );
};
