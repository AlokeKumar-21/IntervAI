import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profileImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    resumeAnalysis: {
  atsScore: {
    type: Number,
    default: null,
  },
  summary: {
    type: String,
    default: "",
  },
  strengths: {
    type: [String],
    default: [],
  },
  weaknesses: {
    type: [String],
    default: [],
  },
  missingSkills: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
  analyzedAt: {
    type: Date,
    default: null,
  },
},

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    graduationYear: {
      type: Number,
      default: null,
    },

    skills: {
      type: [String],
      default: [],
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    targetRole: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;