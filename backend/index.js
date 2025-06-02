import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse incoming JSON requests. It makes req.body contain the parsed data.
app.use(cookieParser()); // Middleware to parse incoming cookies in req.cookies object for authentication purposes

app.use("/api/v1/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});
