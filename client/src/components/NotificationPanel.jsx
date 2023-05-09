import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

const NotificationPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: new Date(),
    },
    {
      id: 2,
      message: "Pellentesque euismod justo quis lacus laoreet tincidunt.",
      date: new Date(),
    },
  ]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.map((notification) => (
          <MenuItem key={notification.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {notification.date.toLocaleString()}
                  </Typography>
                }
              />
            </ListItem>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationPanel;
