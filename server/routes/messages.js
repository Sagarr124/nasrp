import express from "express";
import {
  getUserConversations,
  getConversationMessages,
  createConversation,
} from "../controllers/messages.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/conversations/:userId", verifyToken, getUserConversations);
router.get(
  "/conversations/:conversationId/messages",
  verifyToken,
  getConversationMessages
);

/* CREATE */
router.post("/", verifyToken, createConversation);

export default router;
