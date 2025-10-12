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

const BookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  service: {
    type: String,
    enum: ["Initial Consultation", "Follow-up Session", "Group Coaching"],
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const WebinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  link: { type: String, required: true },
  capacity: { type: Number, default: 100 },
  registrations: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const MealPlanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  goal: { type: String },
  status: {
    type: String,
    enum: ["New", "In Progress", "Completed"],
    default: "New",
  },
  createdAt: { type: Date, default: Date.now },
});

const LifestyleAuditRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["New", "Audit Scheduled", "Completed"],
    default: "New",
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);
const Webinar = mongoose.model("Webinar", WebinarSchema);
const MealPlanRequest = mongoose.model(
  "MealPlanRequest",
  MealPlanRequestSchema
);
const LifestyleAuditRequest = mongoose.model(
  "LifestyleAuditRequest",
  LifestyleAuditRequestSchema
);

// Helper function to wrap route handlers for DB connection
const routeHandler = (handler) => async (req, res, next) => {
  try {
    await connectToDatabase();
    await handler(req, res, next);
  } catch (error) {
    console.error("Route handler error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// =================================================================
// 2. Booking Routes (NEWLY IMPLEMENTED)
// =================================================================

// GET all bookings
app.get(
  "/api/bookings",
  routeHandler(async (req, res) => {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });
    res.json(bookings);
  })
);

// POST a new booking
app.post(
  "/api/bookings",
  routeHandler(async (req, res) => {
    const { clientName, clientEmail, service, date, time } = req.body;
    if (!clientName || !clientEmail || !service || !date || !time) {
      return res.status(400).json({ error: "Missing required booking fields" });
    }
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  })
);

// PUT (Update) a booking
app.put(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(updatedBooking);
  })
);

// DELETE a booking
app.delete(
  "/api/bookings/:id",
  routeHandler(async (req, res) => {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).send();
  })
);

// =================================================================
// 3. Webinar Routes (NEWLY IMPLEMENTED)
// =================================================================

// GET all webinars
app.get(
  "/api/webinars",
  routeHandler(async (req, res) => {
    const webinars = await Webinar.find().sort({ date: 1, time: 1 });
    res.json(webinars);
  })
);

// POST a new webinar
app.post(
  "/api/webinars",
  routeHandler(async (req, res) => {
    const { title, speaker, date, time, link } = req.body;
    if (!title || !speaker || !date || !time || !link) {
      return res.status(400).json({ error: "Missing required webinar fields" });
    }
    const newWebinar = new Webinar(req.body);
    const savedWebinar = await newWebinar.save();
    res.status(201).json(savedWebinar);
  })
);

// PUT (Update) a webinar
app.put(
  "/api/webinars/:id",
  routeHandler(async (req, res) => {
    const updatedWebinar = await Webinar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWebinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    res.json(updatedWebinar);
  })
);

// DELETE a webinar
app.delete(
  "/api/webinars/:id",
  routeHandler(async (req, res) => {
    const result = await Webinar.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    res.status(204).send();
  })
);

// =================================================================
// 4. Meal Plan Request Routes (EXISTING - RETAINED)
// =================================================================

// GET all meal plan requests
app.get(
  "/api/mealplans",
  routeHandler(async (req, res) => {
    const mealPlanRequests = await MealPlanRequest.find().sort({
      createdAt: -1,
    });
    res.json(mealPlanRequests);
  })
);

// POST a new meal plan request
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

// =================================================================
// 5. Lifestyle Audit Request Routes (EXISTING - RETAINED)
// =================================================================

// GET all lifestyle audit requests
app.get(
  "/api/lifestylerequests",
  routeHandler(async (req, res) => {
    const lifestyleRequests = await LifestyleAuditRequest.find().sort({
      createdAt: -1,
    });
    res.json(lifestyleRequests);
  })
);

// POST a new lifestyle audit request
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

// =================================================================
// 6. Stats Route (For Dashboard Overview)
// =================================================================

app.get(
  "/api/stats",
  routeHandler(async (req, res) => {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({
      status: "Pending",
    });
    const totalWebinars = await Webinar.countDocuments();
    const activeWebinars = await Webinar.countDocuments({
      date: { $gte: new Date() },
    });
    const totalMealPlans = await MealPlanRequest.countDocuments();
    const pendingMealPlans = await MealPlanRequest.countDocuments({
      status: "New",
    });
    const totalLifestyleAudits = await LifestyleAuditRequest.countDocuments();
    const pendingLifestyleAudits = await LifestyleAuditRequest.countDocuments({
      status: "New",
    });

    res.json({
      totalBookings,
      pendingBookings,
      totalWebinars,
      activeWebinars,
      totalMealPlans,
      pendingMealPlans,
      totalLifestyleAudits,
      pendingLifestyleAudits,
    });
  })
);

// =================================================================
// 7. Start Server
// =================================================================

// Connect to DB and start server only if not in a serverless environment (optional check)
if (
  process.env.NODE_ENV !== "production" ||
  process.env.IS_SERVERLESS !== "true"
) {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
} else {
  // Export app for serverless functions (e.g., Vercel)
  console.log("Serverless mode: App exported.");
}

export default app; // For Vercel/Serverless deployment
