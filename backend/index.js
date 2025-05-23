import express from "express";
import dotenv from "dotenv"
import { connectDatabase } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json()); // Middleware to parse incoming JSON requests. It makes req.body contain the parsed data.
app.use(cookieParser()); // Middleware to parse incoming cookies in req.cookies object for authentication purposes

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    connectDatabase()
    console.log(`Server is running on port ${PORT}`);
})