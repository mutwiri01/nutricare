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
  name: String, // Requester Name
  email: String, // Requester Email
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

  // NEW CORPORATE FIELDS (used when serviceType is 'corporate')
  corporateName: String,
  contactDetails: String,
  sector: String,
  noOfEmployees: Number, // Stored as a Number
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

// Helper function to handle connection and API logic
const routeHandler = (handler) => async (req, res) => {
  try {
    await connectToDatabase();
    await handler(req, res);
  } catch (error) {
    console.error(`Route error in ${req.method} ${req.path}:`, error.message);
    // Log the full error for debugging, but send a generic 500 to the client
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Bookings Routes (GET, POST, PUT, DELETE)
app.get(
  "/api/bookings",
  routeHandler(async (req, res) => {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });
    res.json(bookings);
  })
);

app.post(
  "/api/bookings",
  routeHandler(async (req, res) => {
    // Validation for new corporate fields added in frontend
    if (req.body.serviceType === "corporate") {
      const requiredCorporateFields = [
        "corporateName",
        "contactDetails",
        "sector",
        "noOfEmployees",
        "employeeHealthStatus",
        "reasonsForCoaching",
        "expectedOutcomes",
      ];
      for (const field of requiredCorporateFields) {
        if (!req.body[field]) {
          return res
            .status(400)
            .json({ error: `Missing required corporate field: ${field}` });
        }
      }
    }
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  })
);

// CRITICAL FIX: PUT/UPDATE Route for Admin Dashboard
app.put(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  })
);

// CRITICAL FIX: DELETE Route for Admin Dashboard
app.delete(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  })
);

// New Routes for Meal Plan Requests
app.get(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const mealPlanRequests = await MealPlanRequest.find().sort({
      createdAt: -1,
    });
    res.json(mealPlanRequests);
  })
);

app.post(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const mealPlanRequest = new MealPlanRequest(req.body);
    const savedRequest = await mealPlanRequest.save();
    res.status(201).json(savedRequest);
  })
);

// New Routes for Lifestyle Audit Requests
app.get(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const lifestyleRequests = await LifestyleAuditRequest.find().sort({
      createdAt: -1,
    });
    res.json(lifestyleRequests);
  })
);

app.post(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const lifestyleRequest = new LifestyleAuditRequest(req.body);
    const savedRequest = await lifestyleRequest.save();
    res.status(201).json(savedRequest);
  })
);

// Existing Webinar Routes (omitted PUT/DELETE for brevity, assuming existing logic is retained)
app.get(
  "/api/webinars",
  routeHandler(async (req, res) => {
    const webinars = await Webinar.find().sort({
      createdAt: -1,
    });
    res.json(webinars);
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Export the app for Vercel's serverless function handler
export default app;
