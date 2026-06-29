import { createContext, useEffect, useState } from "react";
import {
  login as loginService,
  signup as signupService,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data.user || data);
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

 //login
  const login = async (credentials) => {
  const data = await loginService(credentials);

  localStorage.setItem("token", data.token);
  setUser(data.user);

  return data;
};

  // Signup
  const signup = async (userData) => {
  const data = await signupService(userData);

  localStorage.setItem("token", data.token);
  setUser(data.user);

  return data;
};

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

