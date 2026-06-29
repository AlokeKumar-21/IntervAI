import api from "./api";

/**
 * Register a new user
 */
export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Get logged in user
 */
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};