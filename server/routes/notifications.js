import express from "express";
import { sendNotification, getNotifications } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, sendNotification);

/* READ */
router.get("/", verifyToken, getNotifications);

export default router;
