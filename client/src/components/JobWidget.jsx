import { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "state";

const JobWidget = ({
  jobId,
  title,
  category,
  description,
  clientId,
  clientPicture,
  clientName,
  date,
}) => {
  const dispatch = useDispatch();
  const { _id, username } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userMode = useSelector((state) => state.userMode);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const [open, setOpen] = useState(false);
  const [bid, setBid] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setBid("");
    setOpen(false);
  };

  const sendNotification = async () => {
    const formData = new FormData();
    formData.append("senderId", _id);
    formData.append("receiverId", clientId);
    formData.append(
      "text",
      `You received an offer of Rs. ${bid} from ${username}`
    );

    const response = await fetch(`http://localhost:3001/notifications`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const notifications = await response.json();
    dispatch(setNotifications({ notifications }));
    handleClose();
  };

  return (
    <WidgetWrapper m="1rem 0">
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <Box>
            <Typography variant="h4" color={dark} fontWeight="500">
              {title}
            </Typography>
            <Typography color={medium}>{category}</Typography>
          </Box>
        </FlexBetween>
        <Typography color={medium}>{date}</Typography>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Typography color={dark}>{description}</Typography>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem">
          <UserImage image={clientPicture} size="35px" />
          <Typography color={medium}>{clientName}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Button
          disabled={userMode === "client"}
          fullWidth
          sx={{
            color: "white",
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              color: palette.primary.main,
            },
          }}
          onClick={handleOpen}
        >
          Apply Now
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "18rem",
              bgcolor: "white",
              border: "2px solid #000",
              borderRadius: "1rem",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              fontSize={"1rem"}
              fontWeight={"600"}
              marginBottom={"1rem"}
            >
              Do you want to send the request?
            </Typography>
            <TextField
              fullWidth
              label="Your Bid"
              name="bid"
              value={bid}
              onChange={(event) => setBid(event.target.value)}
              required
            />
            <FlexBetween>
              <Button
                onClick={handleClose}
                sx={{
                  m: "1rem 0",
                  p: "0.75rem 2rem",
                  borderRadius: "3rem",
                  color: palette.background.main,
                  "&:hover": { color: palette.primary.main },
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={sendNotification}
                sx={{
                  m: "1rem 0",
                  p: "0.75rem 2rem",
                  marginLeft: "2rem",
                  borderRadius: "3rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
                variant="outlined"
              >
                Confirm
              </Button>
            </FlexBetween>
          </Box>
        </Modal>
      </Box>
    </WidgetWrapper>
  );
};

export default JobWidget;
