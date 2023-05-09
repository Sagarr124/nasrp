import { Typography, TableRow, TableCell, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

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
  const { palette } = useTheme();
  const navigate = useNavigate();
  const primary = palette.primary.main;

  return (
    <TableRow hover>
      <TableCell>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="55px" />
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{
              paddingRight: "4rem",
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
      {pageType === "orders" && (
        <TableCell sx={{ fontSize: "0.9rem" }}>{description}</TableCell>
      )}
      <TableCell sx={{ fontSize: "0.9rem" }}>{endDate}</TableCell>
      <TableCell sx={{ fontSize: "0.9rem" }}>Rs. {amount}</TableCell>
      <TableCell
        sx={{
          fontSize: "0.9rem",
        }}
      >
        {orderStatus}
      </TableCell>
    </TableRow>
  );
};

export default OrderWidget;
