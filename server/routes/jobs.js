import express from "express";
import { postJob, getJobs, removeJob } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, postJob);

/* READ */
router.get("/", verifyToken, getJobs);

/* DELETE */
router.get("/:jobId", verifyToken, removeJob);

export default router;
