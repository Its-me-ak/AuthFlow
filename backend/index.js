import express from "express";
import dotenv from "dotenv"
import { connectDatabase } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse incoming JSON requests. It makes req.body contain the parsed data.

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDatabase()
    console.log(`Server is running on port ${PORT}`);
})