import React, { useState } from "react";
import {motion} from "motion/react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";

const ResetPasswordPage = () => {
  const { resetPassword, isLoading, error, message } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      await resetPassword(password, token);
      toast.success(
        "Password reset successfully, Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
          <Input
            icon={Lock}
            type="Password"
            name="password"
            placeholder="Conirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            <Button type="submit" isLoading={isLoading}>
              Set New Password
            </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
