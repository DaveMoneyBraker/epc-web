import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface Props extends Omit<IconButtonProps, "children"> {
  icon: React.ComponentType<SvgIconProps>;
}

export const EnhancedIconButton: React.FC<Props> = ({
  icon: Icon,
  ...props
}) => {
  return (
    <IconButton {...props}>
      <Icon />
    </IconButton>
  );
};
