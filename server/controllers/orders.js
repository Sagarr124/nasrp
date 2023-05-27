import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

/* CREATE */
export const createOrder = async (req, res) => {
  try {
    const { clientId, freelancerId, description, amount, startDate, endDate } = req.body;
    const newOrder = new Order({
      clientId,
      freelancerId,
      description,
      amount,
      startDate,
      endDate,
      orderStatus: "in progress"
    });

    const order = await newOrder.save();

    const newPayment = new Payment({
      orderId: order._id,
      amount,
    });

    await newPayment.save();

    res.json({ orderId: order._id });

    res.status(201).json(order);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getOrders = async (req, res) => {
  try {
    const { userId, userMode } = req.params;
    if(userMode === "client") {
      const clientOrders = await Order.find({ clientId : userId });
      res.status(200).json(clientOrders);
    }
    else {
      const freelancerOrders = await Order.find({ freelancerId : userId });
      res.status(200).json(freelancerOrders);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};