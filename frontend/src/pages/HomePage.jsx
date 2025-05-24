import React from "react";
import { motion } from "motion/react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Button from "../components/Button";

const HomePage = () => {
  const { logout, user } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900/90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Welcome to AuthFlow
      </h1>
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-green-500">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <Button
        onClick={handleLogout}
        >
          Logout
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
