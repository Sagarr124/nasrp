import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell } from "@mui/material";
import { setOrders, setUsers } from "../state";
import OrderWidget from "./OrderWidget";

const OrdersWidget = ({ userId, page = "orders" }) => {
  const dispatch = useDispatch();
  const { users, orders, token, userMode } = useSelector((state) => state);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  };

  const getOrders = async () => {
    const response = await fetch(
      `http://localhost:3001/orders/${userId}/${userMode}/orders`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setOrders({ orders: data }));
  };

  useEffect(() => {
    getUsers();
    getOrders();
  }, [userMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {orders.length > 0 ? (
        orders.map(
          ({
            _id,
            clientId,
            freelancerId,
            description,
            amount,
            endDate,
            orderStatus,
          }) => {
            const userId = userMode === "client" ? freelancerId : clientId;
            const user = users.find((usr) => usr._id === userId);

            if (page === "dashboard" && orderStatus === "in progress") {
              return (
                <OrderWidget
                  key={_id}
                  orderId={_id}
                  userId={userId}
                  fullName={user?.fullName || ""}
                  picturePath={user?.picturePath || ""}
                  description={description}
                  amount={amount}
                  endDate={new Date(endDate).toLocaleDateString()}
                  orderStatus={orderStatus}
                  pageType={page}
                />
              );
            } else if (page === "orders") {
              return (
                <OrderWidget
                  key={_id}
                  orderId={_id}
                  userId={userId}
                  fullName={user?.fullName || ""}
                  picturePath={user?.picturePath || ""}
                  description={description}
                  amount={amount}
                  endDate={new Date(endDate).toLocaleDateString()}
                  orderStatus={orderStatus}
                  pageType={page}
                />
              );
            } else {
              return null;
            }
          }
        )
      ) : (
        <TableRow>
          <TableCell sx={{ fontSize: "0.9rem", textAlign: "center" }}>
            No orders to show
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default OrdersWidget;
