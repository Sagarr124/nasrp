import express from "express";
import { sendNotification, getNotifications, readNotification } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getNotifications);

/* CREATE */
router.post("/", verifyToken, sendNotification);

/* UPDATE */
router.patch("/:notificationId/read", verifyToken, readNotification);

export default router;
