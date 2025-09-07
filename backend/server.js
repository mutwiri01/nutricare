import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - with serverless optimization
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    mongoose.set("strictQuery", true);
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

// Connect to MongoDB
connectToDatabase();

// Define routes
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

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

app.post("/api/bookings", async (req, res) => {
  try {
    await connectToDatabase();
    const { name, email, date, service } = req.body;

    if (!name || !email || !date || !service) {
      return res.status(400).json({ error: "All fields are required" });
    }

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
    await connectToDatabase();
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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
export default app;