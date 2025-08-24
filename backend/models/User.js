// File: Updated User.js (with required fields)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      maxlength: [30, "First name cannot be more than 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
      maxlength: [30, "Last name cannot be more than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    userType: {
      type: String,
      enum: ["individual", "corporate", "healthcare"],
      default: "individual"
    },
    phone: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    healthConditions: [
      {
        type: String,
        trim: true,
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate bookings
userSchema.virtual("bookings", {
  ref: "Booking",
  foreignField: "user",
  localField: "_id",
});

// Virtual populate registeredWebinars
userSchema.virtual("registeredWebinars", {
  ref: "Webinar",
  foreignField: "attendees",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);
export default User;