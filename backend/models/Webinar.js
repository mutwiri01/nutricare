import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a webinar title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
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
    default: "60 mins",
  },
  speaker: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["upcoming", "live", "completed", "cancelled"],
    default: "upcoming",
  },
  maxAttendees: {
    type: Number,
    default: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes
webinarSchema.index({ date: 1 });
webinarSchema.index({ status: 1 });

const Webinar = mongoose.model("Webinar", webinarSchema);
export default Webinar;
