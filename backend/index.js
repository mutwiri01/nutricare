/* eslint-disable no-undef */
// server.js - Optimized for Vercel serverless functions
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
    {
        origin:["https://center4nutritionalhealthcare.vercel.app/"],
        methods:["POST","GET"],
        credentials:true
    }
));
app.use(express.json());

// MongoDB Connection - with serverless optimization
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // Set strictQuery option to suppress deprecation warning
    mongoose.set("strictQuery", true);

    // Connect to MongoDB using the connection URL from environment variables
    const client = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedDb = client;
    console.log("MongoDB Connected successfully");
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Add a simple route for testing
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({
      message: "Server is running!",
      database: "Connected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server is running but database connection failed",
      error: error.message,
    });
  }
});

// Import routes dynamically to avoid loading issues
app.use("/api/bookings", async (req, res, next) => {
  try {
    const { default: bookingRoutes } = await import("./routes/bookings.js");
    return bookingRoutes(req, res, next);
  } catch (error) {
    console.error("Error loading bookings routes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/webinars", async (req, res, next) => {
  try {
    const { default: webinarRoutes } = await import("./routes/webinars.js");
    return webinarRoutes(req, res, next);
  } catch (error) {
    console.error("Error loading webinars routes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For Vercel deployment, we need to export the app as a serverless function
export default app;

// Only listen locally when not in Vercel environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
