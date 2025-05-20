import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import { generateTokensAndSetCookies } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from "../mailtrap/email.js";


// signup
export const signup = async (req, res) => {
    // Get user data from request body
    const { name, email, password } = req.body;
    try {
        // Validate user data
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and 8 characters long',
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // Token valid for 15 minutes
        });
        // Save user to database
        await user.save();
        // JWT
        generateTokensAndSetCookies(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            message: "User created successfully", user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Verify email
export const verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    try {
        // Validate verification token
        if (!verificationCode) {
            return res.status(400).json({ message: "Verification code is required" });
        }

        // Find user by verification token
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        // Update user to mark as verified
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Send welcome email
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            message: "Email verified successfully", user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email before logging in" });
        }

        // Generate tokens and set cookies
        generateTokensAndSetCookies(res, user._id);
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in Login", error);
        res.status(500).json({ message: error.message });
    }
};

// logout
export const logout = async (req, res) => {
    res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({
            message: "User logged successfully"
        })
}

// forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({ success: true, message: "Password reset email sent successfully" })

    } catch (error) {
        console.log("Error in forgot password", error);
        res.status(500).json({ message: error.message });
    }
}