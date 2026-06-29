import api from "./api";

// Generate Interview
export const generateInterview = async (data) => {
  const response = await api.post("/interview/generate", data);
  return response.data;
};

// Get Interview By ID
export const getInterview = async (id) => {
  const response = await api.get(`/interview/${id}`);
  return response.data;
};

// Submit Interview
export const submitInterview = async (id, answers) => {
  const response = await api.post(`/interview/${id}/submit`, {
    answers,
  });

  return response.data;
};

// Interview History
export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};