import { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Snackbar,
  Alert,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { setOrder } from "../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const OrderWidget = ({
  orderId,
  userId,
  fullName,
  picturePath,
  description,
  endDate,
  amount,
  orderStatus,
  pageType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userMode } = useSelector((state) => state);
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const markOrderAsCompleted = async () => {
    const response = await fetch(
      `http://localhost:3001/orders/${orderId}/complete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updatedOrder = await response.json();
    if (response.status === 200) {
      dispatch(setOrder({ order: updatedOrder }));
      setSnackbarMessage("Order marked as completed!");
      setSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Failed to mark order as completed!");
      setSeverity("error");
      setSnackbarOpen(true);
    }
    setOpen(false);
  };

  const cancelOrder = async () => {
    const response = await fetch(
      `http://localhost:3001/orders/${orderId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updatedOrder = await response.json();
    if (response.status === 200) {
      dispatch(setOrder({ order: updatedOrder }));
      setSnackbarMessage("Order cancelled!");
      setSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Failed to cancel order!");
      setSeverity("error");
      setSnackbarOpen(true);
    }
    setOpen(false);
  };

  return (
    <>
      <TableRow
        hover
        onClick={
          userMode === "client" && orderStatus === "in progress"
            ? handleOpen
            : ""
        }
      >
        <TableCell>
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} size="55px" />
            <Typography
              variant="h5"
              fontWeight="500"
              sx={{
                paddingRight: pageType === "orders" ? "4rem" : "0",
                "&:hover": {
                  color: primary,
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                navigate(`/profile/${userId}`);
                navigate(0);
              }}
            >
              {fullName}
            </Typography>
          </FlexBetween>
        </TableCell>
        <TableCell sx={{ fontSize: "0.9rem" }}>{description}</TableCell>
        <TableCell sx={{ fontSize: "0.9rem" }}>{endDate}</TableCell>
        <TableCell sx={{ fontSize: "0.9rem" }}>Rs. {amount}</TableCell>
        {pageType === "orders" && (
          <TableCell sx={{ fontSize: "0.9rem" }}>{orderStatus}</TableCell>
        )}
      </TableRow>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "24rem",
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
            Order Action
          </Typography>
          <FlexBetween>
            <Button
              onClick={cancelOrder}
              sx={{
                m: "1rem 0",
                p: "0.5rem 4rem",
                borderRadius: "2rem",
                color: palette.background.main,
                "&:hover": { color: palette.primary.main },
              }}
              variant="outlined"
            >
              Cancel Order
            </Button>
            <Button
              onClick={markOrderAsCompleted}
              sx={{
                m: "1rem 0",
                p: "0.5rem 4rem",
                marginLeft: "1.5rem",
                borderRadius: "2rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              variant="outlined"
            >
              Mark As Completed
            </Button>
          </FlexBetween>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={severity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderWidget;
