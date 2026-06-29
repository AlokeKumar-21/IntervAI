import api from "./api";

// Get profile
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

// Update profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/profile", profileData);
  return response.data;
};

// Upload profile image
export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await api.put("/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Upload resume
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.put("/profile/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};