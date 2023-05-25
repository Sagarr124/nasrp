import express from "express";
import { getOrders, createOrder } from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/:userMode/orders", verifyToken, getOrders);

/* CREATE */
router.post("/", verifyToken, createOrder);

export default router;
