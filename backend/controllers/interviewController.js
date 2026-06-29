import path from "path";

import Interview from "../models/Interview.js";
import User from "../models/User.js";

import { extractResumeText } from "../services/resumeParser.js";
import {
  generateInterviewQuestions,
  analyzeInterviewAnswers,
} from "../services/geminiService.js";

// ==============================================
// Generate Interview
// POST /api/interview/generate
// ==============================================

export const generateInterview = async (req, res) => {
  try {
    const { targetRole, difficulty = "Medium" } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: "Target role is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let resumeText = "";

    if (user.resume) {
      try {
        resumeText = await extractResumeText(path.resolve(user.resume));
      } catch (err) {
        console.log("Resume parsing skipped.");
      }
    }

    const questions = await generateInterviewQuestions(
      targetRole,
      resumeText
    );

    const interview = await Interview.create({
      user: user._id,
      targetRole,
      difficulty,
      questions,
    });

    return res.status(201).json({
      success: true,
      message: "Interview generated successfully",
      interview,
    });
  } catch (error) {
    console.error("Generate Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================================
// Get Interview History
// GET /api/interview/history
// ==============================================

export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
  user: req.user.id,
})
  .select(
    "targetRole difficulty overallFeedback.overallScore createdAt updatedAt"
  )
  .sort({
    createdAt: -1,
  });

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================================
// Get Interview By Id
// GET /api/interview/:id
// ==============================================

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================================
// Submit Interview
// POST /api/interview/:id/submit
// ==============================================

export const submitInterview = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers are required.",
      });
    }

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const feedback = await analyzeInterviewAnswers(
      interview.questions,
      answers
    );

    // Normalize scores
feedback.technicalScore = Math.max(
  0,
  Math.min(100, Number(feedback.technicalScore) || 0)
);

feedback.communicationScore = Math.max(
  0,
  Math.min(100, Number(feedback.communicationScore) || 0)
);

feedback.overallScore = Math.max(
  0,
  Math.min(100, Number(feedback.overallScore) || 0)
);

    interview.answers = answers.map((item, index) => ({
      question: item.question,
      answer: item.answer,
      score: feedback.answers?.[index]?.score || 0,
      aiFeedback: feedback.answers?.[index]?.feedback || "",
    }));

    interview.overallFeedback = {
      technicalScore: feedback.technicalScore || 0,
      communicationScore: feedback.communicationScore || 0,
      overallScore: feedback.overallScore || 0,
      suggestions: feedback.suggestions || [],
    };

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview submitted successfully",
      interview,
    });
  } catch (error) {
    console.error("Submit Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};