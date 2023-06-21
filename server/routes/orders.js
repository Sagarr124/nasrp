import express from "express";
import { getOrders, createOrder, markOrderAsCompleted, cancelOrder } from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/:userMode/orders", verifyToken, getOrders);

/* CREATE */
router.post("/", verifyToken, createOrder);

/* UPDATE */
router.patch("/:orderId/complete", verifyToken, markOrderAsCompleted);
router.patch("/:orderId/cancel", verifyToken, cancelOrder);

export default router;
