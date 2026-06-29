import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume,
} from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async (profileData) => {
    const data = await updateProfile(profileData);
    setProfile(data.user);
    return data;
  };

 const uploadImage = async (file) => {
  const data = await uploadProfileImage(file);

  await loadProfile();

  return data;
};

  const uploadCV = async (file) => {
  const data = await uploadResume(file);

  await loadProfile();

  return data;
};

  return {
    profile,
    loading,
    saveProfile,
    uploadImage,
    uploadCV,
    reload: loadProfile,
  };
};