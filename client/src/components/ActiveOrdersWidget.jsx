import {
  Grid,
  Divider,
  Typography,
  Paper,
  Table,
  TableBody,
  TableContainer,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import WidgetWrapper from "./WidgetWrapper";
import OrdersWidget from "./OrdersWidget";

const ActiveOrdersWidget = ({ userId, page }) => {
  const { orders } = useSelector((state) => state);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const activeOrderCount = orders.reduce((count, order) => {
    if (new Date(order.endDate) > new Date()) {
      return count + 1;
    }
    return count;
  }, 0);

  const totalPriceOfActiveOrders = orders.reduce((totalPrice, order) => {
    if (new Date(order.endDate) > new Date()) {
      return totalPrice + order.amount;
    }
    return totalPrice;
  }, 0);

  return (
    <WidgetWrapper sx={{ paddingTop: "0.75rem" }}>
      <Grid display="flex">
        <Typography variant="h5" color={dark} fontWeight="500">
          Active Orders&nbsp;
        </Typography>
        <Typography fontSize="medium" color={medium} fontWeight="500">
          {" "}
          - {activeOrderCount} {`(Rs. ${totalPriceOfActiveOrders})`}
        </Typography>
      </Grid>

      <Divider sx={{ margin: "0.25rem 0 0.75rem 0" }} />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableBody>
              <OrdersWidget userId={userId} page={page} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </WidgetWrapper>
  );
};

export default ActiveOrdersWidget;
