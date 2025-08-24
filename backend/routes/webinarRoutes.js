import express from "express";
import {
  getWebinars,
  getWebinar,
  registerForWebinar,
  getMyWebinars,
  createWebinar,
  updateWebinar,
  deleteWebinar,
} from "../controllers/webinarController.js";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(getWebinars)
  .post(protect, restrictTo("admin"), createWebinar);

router
  .route("/:id")
  .get(getWebinar)
  .put(protect, restrictTo("admin"), updateWebinar)
  .delete(protect, restrictTo("admin"), deleteWebinar);

router.post("/:id/register", protect, registerForWebinar);
router.get("/my-webinars", protect, getMyWebinars);

export default router;
