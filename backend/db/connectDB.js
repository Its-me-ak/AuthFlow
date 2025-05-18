import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connect.connection.host} and the datebase is ${connect.connection.name}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit the process with a failure code if MongoDB connection fails
        // @ become %40 when db cnnected from env mongodb uri
    }
}
