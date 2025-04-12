import axiosInstance from "./axios.config";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const authService = {
  loginWithGoogle: async (code) => {
    try {
      const response = await axiosInstance.get("/auth/google/callback", {
        params: { code },
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  setAuthToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
  },
};
