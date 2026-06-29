import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure upload directories exist
const profileDir = "uploads/profiles";
const resumeDir = "uploads/resumes";

[profileDir, resumeDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, profileDir);
    } else if (file.fieldname === "resume") {
      cb(null, resumeDir);
    } else {
      cb(new Error("Invalid upload field"), null);
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImage") {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG and PNG images are allowed"));
    }
  }

  if (file.fieldname === "resume") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
  }

  cb(null, true);
};

// Upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;