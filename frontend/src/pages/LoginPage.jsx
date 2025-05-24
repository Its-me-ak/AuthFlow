import React, { useEffect, useState } from 'react'
import { motion, } from "motion/react"
import Input from '../components/Input'
import { Mail, Lock, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Button from '../components/Button'



const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isLoading, error, clearError } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  useEffect(() => {
    clearError()
  }, [clearError])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
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

          <div className="flex items-center mb-2">
            <Link
              to="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}

        <Button type='submit' isLoading={isLoading}>
          Login
        </Button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900/50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account ?
          <Link to="/signup" className="text-green-500 hover:underline ml-2">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default LoginPage