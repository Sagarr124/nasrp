import express from "express";
import { getConversations, getMessages, sendMessage } from "../controllers/messages.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/conversations/:userId", verifyToken, getConversations);
router.get("/conversations/query/:senderId/:receiverId", verifyToken, getMessages);

/* CREATE */
router.post("/", verifyToken, sendMessage);

export default router;
