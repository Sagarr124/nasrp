import express from "express";
import {
  getUser,
  getUsers
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUsers);

router.get("/:id", verifyToken, getUser);

export default router;
