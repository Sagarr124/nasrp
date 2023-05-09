import express from "express";
import { getUserMessages } from "../controllers/messages.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/messages", verifyToken, getUserMessages);

export default router;
