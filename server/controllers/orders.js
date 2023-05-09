import Order from "../models/Order.js";

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