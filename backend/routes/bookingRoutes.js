import express from "express";
import {
  createBooking,
  getMyBookings,
  getBooking,
  updateBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createBooking).get(getMyBookings);

router.route("/:id").get(getBooking).put(updateBooking).delete(cancelBooking);

export default router;
