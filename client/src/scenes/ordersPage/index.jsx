import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import OrdersWidget from "../../components/OrdersWidget";

const OrdersPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const userMode = useSelector((state) => state.userMode);

  useEffect(() => {
    document.title = "NASRP - Orders";
  });

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  <TableCell width={"20%"}>
                    {userMode === "freelancer" ? "Client" : "Freelancer"}
                  </TableCell>
                  <TableCell width={"40%"}>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <OrdersWidget userId={_id} />
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrdersPage;
