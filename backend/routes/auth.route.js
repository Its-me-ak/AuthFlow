import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)
router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)


// router.get('/refresh-token', refreshAccessToken);

export default router;