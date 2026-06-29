import api from "./api";

// Parse Resume
export const parseResume = async () => {
  const response = await api.get("/profile/resume/parse");
  return response.data;
};

// Analyze Resume
export const analyzeResume = async () => {
  const response = await api.post("/profile/resume/analyze");
  return response.data;
};