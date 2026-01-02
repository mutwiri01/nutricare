// webinars.js - Updated with ES Module syntax
import express from "express";
import Webinar from "../models/Webinar.js";

const router = express.Router();

// Get all webinars
router.get("/", async (req, res) => {
  try {
    const webinars = await Webinar.find().sort({ date: 1 });
    res.json(webinars);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new webinar
router.post("/", async (req, res) => {
  try {
    const webinar = new Webinar(req.body);
    const savedWebinar = await webinar.save();
    res.status(201).json(savedWebinar);
  } catch (error) {
    console.error("Error creating webinar:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get a specific webinar
router.get("/:id", async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    res.json(webinar);
  } catch (error) {
    console.error("Error fetching webinar:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a webinar
router.put("/:id", async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    res.json(webinar);
  } catch (error) {
    console.error("Error updating webinar:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a webinar
router.delete("/:id", async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    res.json({ message: "Webinar deleted successfully" });
  } catch (error) {
    console.error("Error deleting webinar:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
