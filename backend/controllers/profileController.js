import User from "../models/User.js";
import fs from "fs/promises";
import path from "path";
import { extractResumeText } from "../services/resumeParser.js";
import { analyzeResume } from "../services/geminiService.js";

// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const {
  fullName,
  bio,
  skills,
  github,
  linkedin,
  college,
  branch,
  graduationYear,
  portfolio,
  experience,
  targetRole,
  location,
} = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
if (bio !== undefined) user.bio = bio;
if (skills !== undefined) user.skills = skills;
if (github !== undefined) user.github = github;
if (linkedin !== undefined) user.linkedin = linkedin;
if (college !== undefined) user.college = college;
if (branch !== undefined) user.branch = branch;
if (graduationYear !== undefined) user.graduationYear = graduationYear;
if (portfolio !== undefined) user.portfolio = portfolio;
if (experience !== undefined) user.experience = experience;
if (targetRole !== undefined) user.targetRole = targetRole;
if (location !== undefined) user.location = location;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
export const uploadProfileImage = async (req, res) => {
 
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profileImage = req.file.path.replace(/\\/g, "/");

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc Upload Resume
// @route PUT /api/profile/resume
// @access Private
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.resume = req.file.path.replace(/\\/g, "/");
    user.resumeOriginalName = req.file.originalname;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
import User from "../models/User.js"; // Make sure this import exists

export const removeResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.resume = "";
    user.resumeOriginalName = "";
    user.resumeAnalysis = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume removed successfully",
    });
  } catch (error) {
    console.error("Remove Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove resume",
    });
  }
};
// @desc Parse Resume
// @route GET /api/profile/resume/parse
// @access Private
export const parseResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const resumeText = await extractResumeText(user.resume);

    res.status(200).json({
      success: true,
      text: resumeText,
    });
  } catch (error) {
    console.error("Resume Parse Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc Analyze Resume with Gemini AI
// @route POST /api/profile/resume/analyze
// @access Private
export const analyzeResumeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

 

const resumePath = path.resolve(user.resume);



try {
  await fs.access(resumePath);
} catch {
  return res.status(404).json({
    success: false,
    message: "Resume file not found",
  });
}

    // Extract text
    const resumeText = await extractResumeText(resumePath);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract meaningful text from resume",
      });
    }

    // AI Analysis
    const analysis = await analyzeResume(resumeText);

    if (!analysis) {
      return res.status(500).json({
        success: false,
        message: "AI analysis failed",
      });
    }

    // Save to MongoDB
    user.resumeAnalysis = {
      atsScore: analysis.atsScore,
      summary: analysis.summary,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      analyzedAt: new Date(),
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      analysis: user.resumeAnalysis,
    });
  } catch (error) {
    console.error("Analyze Resume Error:", error);

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};
