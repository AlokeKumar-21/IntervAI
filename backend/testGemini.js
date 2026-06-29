import dotenv from "dotenv";
dotenv.config();
console.log("Key:", process.env.GEMINI_API_KEY);
console.log("Key length:", process.env.GEMINI_API_KEY?.length);

import { analyzeResume } from "./services/geminiService.js";

const run = async () => {
  const result = await analyzeResume(`
Aloke Kumar

Skills:
React
Node.js
MongoDB
Express
JavaScript
Python
Tailwind CSS

Projects:
AI Interview Platform
MERN Stack Developer
`);

  console.log(result);
};

run();