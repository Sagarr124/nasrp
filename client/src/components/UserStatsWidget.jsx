import {
  Divider,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";

const UserStatsWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.primary.main;
  const { _id } = useSelector((state) => state.user);
  const { userMode, orders } = useSelector((state) => state);

  const completedOrders = () => {
    return orders.filter(
      (order) =>
        (order.clientId === _id || order.freelancerId === _id) &&
        order.orderStatus === "completed"
    );
  };

  const pendingOrders = () => {
    return orders.filter(
      (order) =>
        (order.clientId === _id || order.freelancerId === _id) &&
        order.orderStatus === "in progress"
    );
  };

  const totalOrders = () => {
    return orders.filter(
      (order) => order.clientId === _id || order.freelancerId === _id
    );
  };

  const totalAmount = () => {
    return orders.reduce((total, order) => {
      if (
        (order.clientId === _id || order.freelancerId === _id) &&
        order.orderStatus === "completed"
      ) {
        return total + order.amount;
      }
      return total;
    }, 0);
  };

  return (
    <WidgetWrapper mb={"2rem"} sx={{ padding: 0 }}>
      <Typography
        fontSize={"1rem"}
        fontWeight={500}
        p={"0.75rem 1.5rem 0.25rem 1.5rem"}
      >
        User Analytics
      </Typography>
      <Divider />
      <TableContainer sx={{ width: "100%", overflow: "hidden" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                  padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                }}
              >
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    p: "2rem",
                    fontSize: "1.25rem",
                    color: dark,
                  }}
                >
                  Completed Orders:&nbsp;&nbsp;{" "}
                  <Typography fontSize={"1.5rem"} fontWeight={500} color={main}>
                    {completedOrders().length}
                  </Typography>
                </Button>
              </TableCell>
              <TableCell sx={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}>
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    p: "2rem",
                    fontSize: "1.25rem",
                    color: dark,
                  }}
                >
                  Pending Orders:&nbsp;&nbsp;
                  <Typography fontSize={"1.5rem"} fontWeight={500} color={main}>
                    {pendingOrders().length}
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                  padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                }}
              >
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    p: "2rem",
                    fontSize: "1.25rem",
                    color: dark,
                  }}
                >
                  Total Orders:&nbsp;&nbsp;{" "}
                  <Typography fontSize={"1.5rem"} fontWeight={500} color={main}>
                    {totalOrders().length}
                  </Typography>
                </Button>
              </TableCell>
              <TableCell sx={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}>
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    p: "2rem",
                    fontSize: "1.25rem",
                    color: dark,
                  }}
                >
                  Total {userMode === "client" ? "Spendings" : "Earnings"}
                  :&nbsp;&nbsp;
                  <Typography
                    fontSize={"1.5rem"}
                    fontWeight={500}
                    color={main}
                    textTransform={"capitalize"}
                  >
                    Rs. {totalAmount()}
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </WidgetWrapper>
  );
};

export default UserStatsWidget;
