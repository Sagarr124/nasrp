import express from "express";
import { postJob, getJobs } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", postJob);

/* READ */
router.get("/", getJobs);

export default router;
