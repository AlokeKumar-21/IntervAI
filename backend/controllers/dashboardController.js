import Interview from "../models/Interview.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const interviews = await Interview.find({
      user: req.user.id,
    })
      .select(
        "targetRole difficulty overallFeedback.overallScore createdAt"
      )
      .sort({
        createdAt: -1,
      });

    const totalInterviews = interviews.length;

    const scores = interviews
      .map((i) => i.overallFeedback?.overallScore || 0)
      .filter((score) => score > 0);

    const averageScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((a, b) => a + b, 0) / scores.length
          )
        : 0;

    const bestScore =
      scores.length > 0 ? Math.max(...scores) : 0;

    return res.status(200).json({
      success: true,
      dashboard: {
        profile: {
          fullName: user.fullName,
          targetRole: user.targetRole,
          profileImage: user.profileImage,
          resumeUploaded: !!user.resume,
          atsScore: user.resumeAnalysis?.atsScore || 0,
        },

        stats: {
          totalInterviews,
          averageScore,
          bestScore,
        },

        recentInterviews: interviews.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};