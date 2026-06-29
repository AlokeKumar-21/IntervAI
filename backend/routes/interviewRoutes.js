import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  generateInterview,
  getInterviewHistory,
  getInterviewById,
  submitInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

// Generate Interview
router.post("/generate", protect, generateInterview);

// Interview History
router.get("/history", protect, getInterviewHistory);

// Get Single Interview
router.get("/:id", protect, getInterviewById);

// Submit Interview
router.post("/:id/submit", protect, submitInterview);

export default router;