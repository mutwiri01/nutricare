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

// UPDATED: New comprehensive lifestyle analysis form schema
const lifestyleAuditRequestSchema = new mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  age: String,
  gender: String,
  contact: String,
  email: { type: String, required: true },
  occupation: String,

  // 1. Nutrition
  nutrition: {
    fruits: String,
    vegetables: String,
    grainsLegumes: String,
    beef: String,
    dairy: String,
    nuts: String,
    processedFoods: String,
  },

  drinks: {
    water: String,
    teaCoffee: String,
    juices: String,
  },

  habits: {
    alcohol: { type: String, enum: ["Y", "N"], default: "N" },
    smoking: { type: String, enum: ["Y", "N"], default: "N" },
    substances: String,
  },

  dietaryIssues: {
    allergies: String,
    sensitivities: String,
    intolerances: String,
  },

  // 2. Physical Activity
  physicalActivity: {
    exercise: String,
    walking: String,
    jogging: String,
    heavyWork: String,
  },

  // 3. Sleep
  sleep: {
    hours: String,
    wakesAtNight: { type: String, enum: ["Y", "N"], default: "N" },
    wakeReason: String,
    wakesTired: { type: String, enum: ["Y", "N"], default: "N" },
  },

  // 4. Occupation
  occupationDetails: {
    isEmployed: { type: String, enum: ["Y", "N"], default: "N" },
    workHours: String,
    enjoysWork: { type: String, enum: ["Y", "N"], default: "N" },
    workEnjoymentReason: String,
    leaveDays: String,
    relaxationActivities: String,
  },

  // 5. Socialization
  socialization: {
    activity1: {
      name: String,
      weekly: String,
      monthly: String,
    },
    activity2: {
      name: String,
      weekly: String,
      monthly: String,
    },
    activity3: {
      name: String,
      weekly: String,
      monthly: String,
    },
  },

  // 6. Spirituality
  spirituality: String,

  // 7. Entertainment & Hobbies
  entertainment: {
    forms: String,
    hobbies: String,
  },

  // 8. Electronic Use
  electronicUse: {
    mobilePhone: String,
    computer: String,
    radio: String,
    tv: String,
    videoGames: String,
    music: String,
    movies: String,
  },

  // 9. Environmental
  environmental: String,

  // 10. Purpose
  purpose: {
    readinessScore: String,
    understandsHealthFactors: { type: String, enum: ["Y", "N"], default: "N" },
  },

  // Additional comments
  additionalComments: String,

  // Status and timestamps
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "reviewed", "in-progress", "completed", "rejected"],
  },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewedBy: String,
  notes: String,
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
    res.json({ message: "Meal Plan deleted" });
  })
);

// Lifestyle Requests (UPDATED for new form structure)
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
    try {
      // Validate required fields
      if (!req.body.name || !req.body.email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const lifestyleRequest = new LifestyleAuditRequest(req.body);
      const savedRequest = await lifestyleRequest.save();
      res.status(201).json(savedRequest);
    } catch (error) {
      console.error("Error saving lifestyle request:", error);
      res
        .status(500)
        .json({
          error: "Failed to save lifestyle request",
          details: error.message,
        });
    }
  })
);

app.put(
  "/api/lifestylerequests/:id",
  routeHandler(async (req, res) => {
    const request = await LifestyleAuditRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(request);
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
    // Also delete associated registrations
    await WebinarRegistration.deleteMany({ webinarId: req.params.id });
    res.json({ message: "Webinar and registrations deleted" });
  })
);

// Webinar Registrations (Admin View)
app.get(
  "/api/webinars/:id/registrations",
  routeHandler(async (req, res) => {
    const registrations = await WebinarRegistration.find({
      webinarId: req.params.id,
    }).sort({ registrationDate: -1 });
    res.json(registrations);
  })
);

app.delete(
  "/api/webinars/:webinarId/registrations/:registrationId",
  routeHandler(async (req, res) => {
    await WebinarRegistration.findByIdAndDelete(req.params.registrationId);
    // Update attendee count
    await Webinar.findByIdAndUpdate(req.params.webinarId, {
      $inc: { currentAttendees: -1 },
    });
    res.json({ message: "Registration removed" });
  })
);

// Webinar Registration (Public)
app.post(
  "/api/webinars/register",
  routeHandler(async (req, res) => {
    const { webinarId, name, email } = req.body;
    const webinar = await Webinar.findById(webinarId);
    if (!webinar) return res.status(404).json({ error: "Webinar not found" });

    if (webinar.currentAttendees >= webinar.maxAttendees) {
      return res.status(400).json({ error: "Webinar is full" });
    }

    const existingRegistration = await WebinarRegistration.findOne({
      webinarId,
      email,
    });
    if (existingRegistration) {
      return res.status(400).json({ error: "Already registered" });
    }

    const registration = new WebinarRegistration({ webinarId, name, email });
    await registration.save();

    webinar.currentAttendees += 1;
    await webinar.save();

    res.status(201).json({ message: "Successfully registered", webinar });
  })
);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
