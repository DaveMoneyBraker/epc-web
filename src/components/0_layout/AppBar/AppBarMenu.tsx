import React from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

interface Props {
  displayName: string;
  onLogout: () => void;
}

export const AppBarMenu: React.FC<Props> = ({ displayName, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => onLogout();

  return (
    <>
      <Button
        sx={{ color: "white" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<AccountCircleOutlinedIcon />}
      >
        {displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Admin</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AssignmentIndOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      <div></div>
    </>
  );
};
