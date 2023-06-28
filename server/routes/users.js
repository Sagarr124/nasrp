import express from "express";
import { getUser, getUsers, updateUserRating } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:userId/rating", verifyToken, updateUserRating);

export default router;
