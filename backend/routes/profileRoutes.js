import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume,
  parseResume,
  analyzeResumeController,
  removeResume,
} from "../controllers/profileController.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/", protect, getProfile);

// Update logged-in user's profile
router.put("/", protect, updateProfile);

// Upload profile image
router.put(
  "/image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);
router.put(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);
router.delete(
  "/resume",
  protect,
  removeResume
);
// Parse uploaded resume
router.get(
  "/resume/parse",
  protect,
  parseResume
);
// Analyze resume with Gemini AI
router.post(
  "/resume/analyze",
  protect,
  analyzeResumeController
);
export default router;
