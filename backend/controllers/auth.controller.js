import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokensAndSetCookies } from "../utils/generateTokenAndSetCookie.js";


// signup
export const signup = async (req, res) => {
    // Get user data from request body
    const { name, email, password } = req.body;
    try {
        // Validate user data
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
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
            verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000, // Token valid for 1 hour
        });
        // Save user to database
        await user.save();
        // JWT
        generateTokensAndSetCookies(res, user._id)
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

// login
export const login = async (req, res) => {
}

// logout
export const logout = async (req, res) => {

}