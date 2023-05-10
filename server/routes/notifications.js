import express from "express";
import { sendNotification, getNotifications } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getNotifications);

/* CREATE */
router.post("/", verifyToken, sendNotification);

export default router;
