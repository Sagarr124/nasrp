import express from "express";
import { getCategories } from "../controllers/categories.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getCategories);

export default router;
