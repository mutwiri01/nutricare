import express from "express";
import {
  getBookings,
  confirmBooking,
  getUsers,
  updateUser,
  getStats,
} from "../controllers/adminController.js";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.get("/bookings", getBookings);
router.put("/bookings/:id/confirm", confirmBooking);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.get("/stats", getStats);

export default router;
