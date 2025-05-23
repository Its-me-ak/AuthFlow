import {create} from "zustand"
import axios  from "axios"

const API_URL = "http://localhost:8080/api/v1/auth"

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (name, email, password) => {
        try {
            set({isLoading: true, error: null})
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading: false})
            throw error
        }
    },

    verifyEmail: async (verificationCode) => {
        try {
            set({isLoading: true, error: null})
            const response = await axios.post(`${API_URL}/verify-email`, { verificationCode })
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
            return response.data
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading: false})
            throw error
        }
    },  
}))