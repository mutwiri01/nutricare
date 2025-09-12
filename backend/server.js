/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
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
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

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

// Define MongoDB Schemas
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  serviceType: String,
  consultationType: String,
  cluster: String,
  date: String,
  time: String,
  condition: String,
  notes: String,
  status: { type: String, default: "confirmed" },
  createdAt: { type: Date, default: Date.now },
});

const webinarSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  duration: String,
  speaker: String,
  description: String,
  currentAttendees: { type: Number, default: 0 },
  maxAttendees: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const webinarRegistrationSchema = new mongoose.Schema({
  webinarId: String,
  name: String,
  email: String,
  registeredAt: { type: Date, default: Date.now },
});

// Create models
const Booking = mongoose.model("Booking", bookingSchema);
const Webinar = mongoose.model("Webinar", webinarSchema);
const WebinarRegistration = mongoose.model(
  "WebinarRegistration",
  webinarRegistrationSchema
);

// Define routes
app.get("/", (req, res) => {
  res.json({
    message: "CNH101 Backend is running successfully!",
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb_uri_defined: !!process.env.MONGODB_URI,
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("/api/health", async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({
      message: "Server is running!",
      database: "Connected",
      status: "Healthy",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server is running but database connection failed",
      error: error.message,
      status: "Unhealthy",
    });
  }
});

// Bookings API
app.get("/api/bookings", async (req, res) => {
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    await connectToDatabase();
    const {
      name,
      email,
      phone,
      serviceType,
      consultationType,
      cluster,
      date,
      time,
      condition,
      notes,
    } = req.body;

    if (!name || !email || !serviceType || !cluster || !date || !time) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const booking = new Booking({
      name,
      email,
      phone,
      serviceType,
      consultationType,
      cluster,
      date,
      time,
      condition,
      notes,
    });

    const savedBooking = await booking.save();
    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      booking: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Webinars API
app.get("/api/webinars", async (req, res) => {
  try {
    await connectToDatabase();
    const webinars = await Webinar.find().sort({ date: 1 });
    res.status(200).json(webinars);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    // Fallback to mock data if database fails
    const mockWebinars = [
      {
        _id: "1",
        title: "Managing Diabetes Through Lifestyle Changes",
        date: "2025-08-15",
        time: "14:00",
        duration: "60 mins",
        speaker: "Dr. Sarah Johnson",
        description:
          "Learn how to manage diabetes through proper nutrition and exercise.",
        currentAttendees: 24,
        maxAttendees: 100,
        status: "upcoming",
      },
      {
        _id: "2",
        title: "Workplace Wellness Strategies",
        date: "2025-08-22",
        time: "16:00",
        duration: "45 mins",
        speaker: "Health Coach Michael Chen",
        description:
          "Effective wellness strategies for corporate environments.",
        currentAttendees: 17,
        maxAttendees: 50,
        status: "upcoming",
      },
      {
        _id: "3",
        title: "Stress Management Techniques",
        date: "2025-09-05",
        time: "11:00",
        duration: "50 mins",
        speaker: "Dr. Emily Rodriguez",
        description: "Practical techniques for managing stress in daily life.",
        currentAttendees: 42,
        maxAttendees: 75,
        status: "upcoming",
      },
    ];
    res.status(200).json(mockWebinars);
  }
});

app.post("/api/webinars", async (req, res) => {
  try {
    await connectToDatabase();
    const {
      title,
      date,
      time,
      duration,
      speaker,
      description,
      maxAttendees,
      status,
    } = req.body;

    if (!title || !date || !time || !duration || !speaker || !maxAttendees) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const webinar = new Webinar({
      title,
      date,
      time,
      duration,
      speaker,
      description,
      maxAttendees,
      status: status || "upcoming",
    });

    const savedWebinar = await webinar.save();
    res.status(201).json({
      message: "Webinar created successfully",
      webinar: savedWebinar,
    });
  } catch (error) {
    console.error("Error creating webinar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/webinars/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    const {
      title,
      date,
      time,
      duration,
      speaker,
      description,
      maxAttendees,
      status,
    } = req.body;

    const updatedWebinar = await Webinar.findByIdAndUpdate(
      id,
      {
        title,
        date,
        time,
        duration,
        speaker,
        description,
        maxAttendees,
        status,
      },
      { new: true }
    );

    if (!updatedWebinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    res.status(200).json({
      message: "Webinar updated successfully",
      webinar: updatedWebinar,
    });
  } catch (error) {
    console.error("Error updating webinar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/webinars/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;

    const deletedWebinar = await Webinar.findByIdAndDelete(id);

    if (!deletedWebinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    // Also delete all registrations for this webinar
    await WebinarRegistration.deleteMany({ webinarId: id });

    res.status(200).json({
      message: "Webinar deleted successfully",
      webinar: deletedWebinar,
    });
  } catch (error) {
    console.error("Error deleting webinar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Webinar Registrations API
app.get("/api/webinars/:id/registrations", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;

    const registrations = await WebinarRegistration.find({
      webinarId: id,
    }).sort({ registeredAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching webinar registrations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/webinars/:id/register", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Check if webinar exists
    const webinar = await Webinar.findById(id);
    if (!webinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    // Check if already registered
    const existingRegistration = await WebinarRegistration.findOne({
      webinarId: id,
      email: email,
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ error: "Already registered for this webinar" });
    }

    // Check if webinar is full
    if (webinar.currentAttendees >= webinar.maxAttendees) {
      return res.status(400).json({ error: "Webinar is full" });
    }

    // Create registration
    const registration = new WebinarRegistration({
      webinarId: id,
      name,
      email,
    });

    const savedRegistration = await registration.save();

    // Update webinar attendee count
    webinar.currentAttendees += 1;
    await webinar.save();

    res.status(201).json({
      message: "Registered for webinar successfully",
      registration: savedRegistration,
      webinar: webinar,
    });
  } catch (error) {
    console.error("Error registering for webinar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MONGODB_URI defined: ${!!process.env.MONGODB_URI}`);
});

// Export the app
module.exports = app;
