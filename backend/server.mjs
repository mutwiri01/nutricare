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
// 1. Define MongoDB Schemas
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
  currentAttendees: { type: Number, default: 0 },
  maxAttendees: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

// NEW: Webinar Registration Schema
const webinarRegistrationSchema = new mongoose.Schema({
  webinarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Webinar",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "registered",
    enum: ["registered", "attended", "cancelled"],
  },
});

// =================================================================
// 2. Define Models
// =================================================================

const Booking = mongoose.model("Booking", bookingSchema);
const Webinar = mongoose.model("Webinar", webinarSchema);
const MealPlanRequest = mongoose.model(
  "MealPlanRequest",
  mealPlanRequestSchema
);
const LifestyleAuditRequest = mongoose.model(
  "LifestyleAuditRequest",
  lifestyleAuditRequestSchema
);
// NEW: Webinar Registration Model
const WebinarRegistration = mongoose.model(
  "WebinarRegistration",
  webinarRegistrationSchema
);

// =================================================================
// 3. API Routes Helper
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

// =================================================================
// 4. Routes
// =================================================================

// NEW: Root route to prevent 404 on deployment URL
app.get("/", (req, res) => {
  res.status(200).json({
    message: "NutriCare API is running successfully",
    status: "online",
  });
});

// Bookings
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
    res.json(booking);
  })
);

app.delete(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  })
);

// Meal Plans
app.get(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const mealPlans = await MealPlanRequest.find().sort({ createdAt: -1 });
    res.json(mealPlans);
  })
);

app.post(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const mealPlan = new MealPlanRequest(req.body);
    const savedMealPlan = await mealPlan.save();
    res.status(201).json(savedMealPlan);
  })
);

app.delete(
  "/api/mealplans/:id",
  routeHandler(async (req, res) => {
    await MealPlanRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal Plan deleted" });
  })
);

// Lifestyle Requests
app.get(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const requests = await LifestyleAuditRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  })
);

app.post(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const lifestyleRequest = new LifestyleAuditRequest(req.body);
    const savedRequest = await lifestyleRequest.save();
    res.status(201).json(savedRequest);
  })
);

app.delete(
  "/api/lifestylerequests/:id",
  routeHandler(async (req, res) => {
    await LifestyleAuditRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Lifestyle Request deleted" });
  })
);

// Webinars
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
    res.json(webinar);
  })
);

app.delete(
  "/api/webinars/:id",
  routeHandler(async (req, res) => {
    await Webinar.findByIdAndDelete(req.params.id);
    res.json({ message: "Webinar deleted" });
  })
);

// NEW: Webinar Registration Route - FIXED: This was missing!
app.post(
  "/api/webinar-registrations",
  routeHandler(async (req, res) => {
    try {
      const { webinarId, name, email } = req.body;

      // Validate webinar exists
      const webinar = await Webinar.findById(webinarId);
      if (!webinar) {
        return res.status(404).json({ error: "Webinar not found" });
      }

      // Check if webinar is full
      if (webinar.currentAttendees >= webinar.maxAttendees) {
        return res.status(400).json({ error: "Webinar is full" });
      }

      // Check if user already registered
      const existingRegistration = await WebinarRegistration.findOne({
        webinarId,
        email,
      });
      if (existingRegistration) {
        return res
          .status(400)
          .json({ error: "You are already registered for this webinar" });
      }

      // Create registration
      const registration = new WebinarRegistration({
        webinarId,
        name,
        email,
      });

      const savedRegistration = await registration.save();

      // Update webinar attendee count
      webinar.currentAttendees += 1;
      await webinar.save();

      res.status(201).json({
        message: "Successfully registered for webinar",
        registration: savedRegistration,
        webinar: {
          title: webinar.title,
          date: webinar.date,
          time: webinar.time,
          currentAttendees: webinar.currentAttendees,
          maxAttendees: webinar.maxAttendees,
        },
      });
    } catch (error) {
      console.error("Webinar registration error:", error);
      res.status(500).json({ error: "Failed to register for webinar" });
    }
  })
);

// NEW: Webinar Registration Endpoint for Individual Webinar
app.post(
  "/api/webinars/:id/register",
  routeHandler(async (req, res) => {
    try {
      const webinarId = req.params.id;
      const { name, email } = req.body;

      // Validate webinar exists
      const webinar = await Webinar.findById(webinarId);
      if (!webinar) {
        return res.status(404).json({ error: "Webinar not found" });
      }

      // Check if webinar is full
      if (webinar.currentAttendees >= webinar.maxAttendees) {
        return res.status(400).json({ error: "Webinar is full" });
      }

      // Check if user already registered
      const existingRegistration = await WebinarRegistration.findOne({
        webinarId,
        email,
      });
      if (existingRegistration) {
        return res
          .status(400)
          .json({ error: "You are already registered for this webinar" });
      }

      // Create registration
      const registration = new WebinarRegistration({
        webinarId,
        name,
        email,
      });

      const savedRegistration = await registration.save();

      // Update webinar attendee count
      webinar.currentAttendees += 1;
      await webinar.save();

      res.status(201).json({
        message: "Successfully registered for webinar",
        registration: savedRegistration,
        webinar: {
          title: webinar.title,
          date: webinar.date,
          time: webinar.time,
          currentAttendees: webinar.currentAttendees,
          maxAttendees: webinar.maxAttendees,
        },
      });
    } catch (error) {
      console.error("Webinar registration error:", error);
      res.status(500).json({ error: "Failed to register for webinar" });
    }
  })
);

// Start server for local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
