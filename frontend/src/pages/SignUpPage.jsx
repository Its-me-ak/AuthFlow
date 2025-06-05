import React, { useState } from "react";
import { motion } from "motion/react";
import Input from "../components/Input";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";

const SignUpPage = () => {
  const { signup, error, isLoading } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <Input
            icon={Lock}
            type="Password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}
          {/* Password strength meter */}
          <PasswordStrengthMeter password={password} />
          <Button type="submit" isLoading={isLoading}>
            Sign Up 
          </Button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900/50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account ?
          <Link to="/login" className="text-green-500 hover:underline ml-2">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
