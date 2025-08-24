import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
    enum: ["personal", "corporate", "online", "cluster"],
  },
  consultationType: {
    type: String,
    required: true,
    enum: ["virtual", "in-person"],
  },
  cluster: {
    type: String,
    enum: ["diabetes", "hypertension", "weight", "heart", null],
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: function () {
      return this.serviceType !== "cluster";
    },
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  meetingLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better performance
bookingSchema.index({ user: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
