// Booking.js - Updated with ES Module syntax
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
    enum: ["personal", "corporate"],
  },
  consultationType: {
    type: String,
    required: true,
    enum: ["virtual", "in-person"],
  },
  cluster: {
    type: String,
    required: true,
    enum: ["nutrition", "fitness", "stress", "sleep"],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  condition: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "confirmed",
    enum: ["confirmed", "cancelled", "completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", BookingSchema);
