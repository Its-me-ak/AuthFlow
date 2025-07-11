import {create} from "zustand"
import axios  from "axios"

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8080/api/v1/auth" 
  : "https://www.authflow.xyz/api/v1/auth";

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  clearError: () => set({ error: null }),
  isLoading: false,
  isCheckingAuth: true,
  message:null,

  signup: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await axios.get(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (verificationCode) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/verify-email`, {
        verificationCode,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });

    } catch (error) {
      set({
        error: error.response.data.message || "Error sending reset password email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));