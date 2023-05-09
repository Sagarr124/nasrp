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
import WidgetWrapper from "./WidgetWrapper";
import OrdersWidget from "./OrdersWidget";

const ActiveOrdersWidget = ({ userId, page }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Grid display="flex">
        <Typography variant="h5" color={dark} fontWeight="500">
          Active Orders&nbsp;
        </Typography>
        <Typography fontSize="medium" color={medium} fontWeight="500">
          {" "}
          - 0 {"(Rs. 0)"}
        </Typography>
      </Grid>

      <Divider sx={{ margin: "0.75rem 0" }} />

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
