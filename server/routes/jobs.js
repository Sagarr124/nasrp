import express from "express";
import { postJob, getJobs } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, postJob);

/* READ */
router.get("/", verifyToken, getJobs);

export default router;
