/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

// =================================================================
// 1. Define MongoDB Schemas (UPDATED)
// =================================================================

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  serviceType: {
    type: String,
    enum: ["personal", "corporate"],
    required: true,
  },
  consultationType: String,
  cluster: String,
  date: String,
  time: String,
  condition: String,
  notes: String,
  corporateName: String,
  contactDetails: String,
  sector: String,
  noOfEmployees: Number,
  employeeHealthStatus: String,
  reasonsForCoaching: String,
  expectedOutcomes: String,
  status: {
    type: String,
    default: "confirmed",
    enum: ["confirmed", "cancelled", "completed", "pending"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const mealPlanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
  email: { type: String, required: true },
  reasonForMealPlan: String,
  durationOfPlan: String,
  isAllergicOrTntolerant: { type: Boolean, default: false },
  requiresHealthCoaching: { type: Boolean, default: false },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "processed", "rejected"],
  },
  createdAt: { type: Date, default: Date.now },
});

const lifestyleAuditRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
  email: { type: String, required: true },
  reasonForAudit: String,
  currentLifestyleChallenges: String,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "processed", "rejected"],
  },
  createdAt: { type: Date, default: Date.now },
});

const webinarSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  duration: String,
  speaker: String,
  description: String,
  currentAttendees: {
    type: Number,
    default: 0,
  },
  maxAttendees: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const webinarRegistrationSchema = new mongoose.Schema({
  webinarId: String,
  name: String,
  email: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// =================================================================
// 2. Define Models (UPDATED)
// =================================================================

const Booking = mongoose.model("Booking", bookingSchema);
const Webinar = mongoose.model("Webinar", webinarSchema);
const WebinarRegistration = mongoose.model(
  "WebinarRegistration",
  webinarRegistrationSchema
);
const MealPlanRequest = mongoose.model(
  "MealPlanRequest",
  mealPlanRequestSchema
);
const LifestyleAuditRequest = mongoose.model(
  "LifestyleAuditRequest",
  lifestyleAuditRequestSchema
);

// =================================================================
// 3. API Routes (CRITICAL FIXES & NEW ROUTES)
// =================================================================

const routeHandler = (handler) => async (req, res) => {
  try {
    await connectToDatabase();
    await handler(req, res);
  } catch (error) {
    console.error(`Route error in ${req.method} ${req.path}:`, error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Bookings Routes
app.get(
  "/api/bookings",
  routeHandler(async (req, res) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  })
);

app.post(
  "/api/bookings",
  routeHandler(async (req, res) => {
    if (req.body.serviceType === "corporate") {
      const requiredFields = [
        "corporateName",
        "contactDetails",
        "sector",
        "noOfEmployees",
        "employeeHealthStatus",
        "reasonsForCoaching",
        "expectedOutcomes",
      ];
      for (const field of requiredFields) {
        if (!req.body[field])
          return res
            .status(400)
            .json({ error: `Missing required corporate field: ${field}` });
      }
    }
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  })
);

app.put(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  })
);

app.delete(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  })
);

// Meal Plan Routes
app.get(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const mealPlans = await MealPlanRequest.find().sort({ createdAt: -1 });
    res.json(mealPlans);
  })
);

app.put(
  "/api/mealplans/:id",
  routeHandler(async (req, res) => {
    const mealPlan = await MealPlanRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(mealPlan);
  })
);

app.delete(
  "/api/mealplans/:id",
  routeHandler(async (req, res) => {
    await MealPlanRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  })
);

// Lifestyle Audit Routes
app.get(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const lifestyleRequests = await LifestyleAuditRequest.find().sort({
      createdAt: -1,
    });
    res.json(lifestyleRequests);
  })
);

app.put(
  "/api/lifestylerequests/:id",
  routeHandler(async (req, res) => {
    const audit = await LifestyleAuditRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(audit);
  })
);

app.delete(
  "/api/lifestylerequests/:id",
  routeHandler(async (req, res) => {
    await LifestyleAuditRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  })
);

// WEBINAR ROUTES (FIXED FOR 404)
app.get(
  "/api/webinars",
  routeHandler(async (req, res) => {
    const webinars = await Webinar.find().sort({ date: 1 });
    res.json(webinars);
  })
);

app.post(
  "/api/webinars",
  routeHandler(async (req, res) => {
    const webinar = new Webinar(req.body);
    const savedWebinar = await webinar.save();
    res.status(201).json(savedWebinar);
  })
);

app.put(
  "/api/webinars/:id",
  routeHandler(async (req, res) => {
    const webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    res.json(webinar);
  })
);

app.delete(
  "/api/webinars/:id",
  routeHandler(async (req, res) => {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    res.json({ message: "Webinar deleted successfully" });
  })
);

app.get(
  "/api/webinars/:id/registrations",
  routeHandler(async (req, res) => {
    const registrations = await WebinarRegistration.find({
      webinarId: req.params.id,
    });
    res.json(registrations);
  })
);

// Start server


export default app;
