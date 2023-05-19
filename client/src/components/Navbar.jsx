import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Tooltip,
  Select,
  Menu,
  MenuItem,
  FormControl,
  Switch,
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  Search,
  MessageOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  ViewStreamOutlined,
  WorkOutlineOutlined,
  HelpOutlineOutlined,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setUserMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { setNotifications } from "../state";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, fullName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userMode = useSelector((state) => state.userMode);
  const notifications = useSelector((state) => state.notifications);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [checked, setChecked] = useState(
    userMode === "freelancer" ? true : false
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchText.trim().length !== 0) {
      navigate("/search", { state: { searchText } });
    }
  };

  const handleSearch = () => {};

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const neutralMain = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const primaryMain = theme.palette.primary.main;
  const alt = theme.palette.background.alt;

  const getNotifications = async () => {
    const response = await fetch(`http://localhost:3001/notifications/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setNotifications({ notifications: data }));
  };

  useEffect(() => {
    getNotifications();
  }, [userMode, anchorEl]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlexBetween padding="1rem 4%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Tooltip title="Nisar Ahmed Siddiqui Rozgaar Programme">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/dashboard")}
            sx={{
              "&:hover": {
                color: primaryMain,
                cursor: "pointer",
              },
            }}
          >
            NASRP
          </Typography>
        </Tooltip>
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Search..."
            value={searchText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="1rem">
          <Tooltip title="Light/Dark Mode">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Jobs">
            <IconButton onClick={() => navigate("/jobs")}>
              <WorkOutlineOutlined sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Orders">
            <IconButton onClick={() => navigate("/orders")}>
              <ViewStreamOutlined sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Messages">
            <IconButton onClick={() => navigate("/messages")}>
              <MessageOutlined sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpen}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsOutlined
                    sx={{ color: dark, fontSize: "25px" }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {Boolean(anchorEl) && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {notifications.length === 0 ? (
                  <MenuItem>
                    <Typography>No notifications</Typography>
                  </MenuItem>
                ) : (
                  notifications.map((notification) => (
                    <MenuItem key={notification._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                          primary={notification.text}
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                            >
                              {notification.createdAt.toLocaleString()}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </MenuItem>
                  ))
                )}
              </Menu>
            )}
          </>
          <Tooltip title="Help">
            <IconButton onClick={() => navigate("")}>
              <HelpOutlineOutlined sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
          <Tooltip
            title={
              userMode === "freelancer"
                ? "Switch to Client Mode"
                : "Switch to Freelancer Mode"
            }
          >
            <Switch
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                dispatch(setUserMode());
              }}
              color="primary"
            />
          </Tooltip>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1.5rem"
          >
            <Tooltip title="Light/Dark Mode">
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <>
                    <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    <Typography
                      variant="button"
                      fontWeight="500"
                      paddingLeft="10px"
                    >
                      Dark Mode
                    </Typography>
                  </>
                ) : (
                  <>
                    <LightModeOutlined sx={{ color: dark, fontSize: "25px" }} />
                    <Typography
                      variant="button"
                      fontWeight="500"
                      paddingLeft="10px"
                    >
                      Light Mode
                    </Typography>
                  </>
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Jobs">
              <IconButton onClick={() => navigate("/jobs")}>
                <WorkOutlineOutlined sx={{ color: dark, fontSize: "25px" }} />
                <Typography
                  variant="button"
                  fontWeight="500"
                  paddingLeft="10px"
                >
                  Jobs
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Orders">
              <IconButton onClick={() => navigate("/orders")}>
                <ViewStreamOutlined sx={{ color: dark, fontSize: "25px" }} />
                <Typography
                  variant="button"
                  fontWeight="500"
                  paddingLeft="10px"
                >
                  Orders
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Messages">
              <IconButton onClick={() => navigate("/messages")}>
                <MessageOutlined sx={{ color: dark, fontSize: "25px" }} />
                <Typography
                  variant="button"
                  fontWeight="500"
                  paddingLeft="10px"
                >
                  Messages
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsOutlined sx={{ color: dark, fontSize: "25px" }} />
                <Typography
                  variant="button"
                  fontWeight="500"
                  paddingLeft="10px"
                >
                  Notifications
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Help">
              <IconButton onClick={() => navigate("")}>
                <HelpOutlineOutlined sx={{ color: dark, fontSize: "25px" }} />
                <Typography
                  variant="button"
                  fontWeight="500"
                  paddingLeft="10px"
                >
                  Help
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                userMode === "freelancer"
                  ? "Switch to Client Mode"
                  : "Switch to Freelancer Mode"
              }
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  color={neutralMain}
                  variant="button"
                  fontWeight="500"
                >
                  Client
                </Typography>
                <Switch
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    dispatch(setUserMode());
                  }}
                  color="primary"
                />
                <Typography
                  color={neutralMain}
                  variant="button"
                  fontWeight="500"
                >
                  Freelancer
                </Typography>
              </Stack>
            </Tooltip>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
