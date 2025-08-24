import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/supportController.js";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createTicket).get(restrictTo("admin"), getTickets);

router.get("/my-tickets", getMyTickets);
router.route("/:id").get(getTicket).put(restrictTo("admin"), updateTicket);

export default router;
