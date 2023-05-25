import express from "express";
import { sendPayment } from "../controllers/payments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, sendPayment);

export default router;
