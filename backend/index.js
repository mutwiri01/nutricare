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

// Middleware - updated CORS configuration
app.use(
  cors({
    origin: [
      "https://center4nutritionalhealthcare.vercel.app",
      "http://localhost:3000", // for local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
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

// Create basic routes to replace the missing imports
app.post("/api/bookings", async (req, res) => {
  try {
    // Connect to database
    await connectToDatabase();

    // Basic booking functionality
    // In a real app, you would save to a database
    const { name, email, date, service } = req.body;

    if (!name || !email || !date || !service) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Simulate saving a booking
    const booking = {
      id: Date.now(),
      name,
      email,
      date,
      service,
      createdAt: new Date(),
    };

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/webinars", async (req, res) => {
  try {
    // Connect to database
    await connectToDatabase();

    // Sample webinar data
    const webinars = [
      {
        id: 1,
        title: "Nutrition Basics",
        date: "2023-12-15",
        speaker: "Dr. Jane Smith",
      },
      {
        id: 2,
        title: "Healthy Eating Habits",
        date: "2023-12-20",
        speaker: "Dr. John Doe",
      },
    ];

    res.status(200).json(webinars);
  } catch (error) {
    console.error("Error fetching webinars:", error);
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
