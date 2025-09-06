// Webinar.js - Updated with ES Module syntax
import mongoose from "mongoose";

const WebinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  maxAttendees: {
    type: Number,
    default: 100,
  },
  currentAttendees: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "upcoming",
    enum: ["upcoming", "live", "completed", "cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Webinar = mongoose.model("Webinar", WebinarSchema);
export default Webinar;
