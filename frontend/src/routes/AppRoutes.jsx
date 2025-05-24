import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import { useAuthStore } from "../store/authStore";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

// proctect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

// redirect authenticated user to the homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <RedirectAuthenticatedUser>
          <SignUpPage />
        </RedirectAuthenticatedUser>
      }
    />
    <Route
      path="/login"
      element={
        <RedirectAuthenticatedUser>
          <LoginPage />
        </RedirectAuthenticatedUser>
      }
    />
    <Route
      path="/verify-email"
      element={
        <RedirectAuthenticatedUser>
          <EmailVerificationPage />
        </RedirectAuthenticatedUser>
      }
    />
    <Route
      path="/forgot-password"
      element={
        <RedirectAuthenticatedUser>
          <ForgotPasswordPage />
        </RedirectAuthenticatedUser>
      }
    />
  </Routes>
);

export default AppRoutes;
