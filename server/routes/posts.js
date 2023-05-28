import express from "express";
import { getPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/posts", verifyToken, getUserPosts);

router.get("/", verifyToken, getPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
