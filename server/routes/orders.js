import express from "express";
import { getOrders } from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/:userMode/orders", verifyToken, getOrders);

export default router;
