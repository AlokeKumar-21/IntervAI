import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetRole: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        aiFeedback: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    overallFeedback: {
      technicalScore: {
        type: Number,
        default: 0,
      },

      communicationScore: {
        type: Number,
        default: 0,
      },

      overallScore: {
        type: Number,
        default: 0,
      },

      suggestions: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);