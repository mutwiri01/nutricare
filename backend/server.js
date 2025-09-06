/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// server.js - Updated with ES Module syntax for Vercel
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import bookingRoutes from "./routes/bookings.js";
import webinarRoutes from "./routes/webinars.js";

// Load environment variables
dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
try {
  // Set strictQuery option to suppress deprecation warning
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the connection URL from environment variables
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.error("MongoDB Connection Error:", error);
    });
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/webinars", webinarRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Handle production - serve static files from React build
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// For Vercel deployment, we need to export the app as a serverless function
export default app;

// Only listen locally when not in Vercel environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
