const express = require("express");
const venueRouter = express.Router();
const Venue = require("../models/venue");
const authMiddleware = require("../middleware/authMiddleWare");


venueRouter.post("/add-venue", authMiddleware, async (req, res) => {
  try {
    const { name, city, address, capacity } = req.body;

    if (!name || !city || !address || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const venueExists = await Venue.findOne({ name, city });
    if (venueExists) {
      return res.status(409).json({ message: "Venue already exists in this city" });
    }

    const newVenue = new Venue({ name, city, address, capacity });
    await newVenue.save();

    return res.status(201).json({ message: "Venue added successfully", venue: newVenue });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


venueRouter.get("/all-venues", async (req, res) => {
  try {
    const venues = await Venue.find({});
    return res.status(200).json({ venues });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching venues", error: error.message });
  }
});


venueRouter.get("/venue/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json({ venue });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching venue", error: error.message });
  }
});


venueRouter.put("/update-venue/:id", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const venue = await Venue.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    return res.status(200).json({ message: "Venue updated", venue });
  } catch (error) {
    return res.status(500).json({ message: "Update failed", error: error.message });
  }
});


venueRouter.delete("/delete-venue/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Venue.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Venue not found" });
    }

    return res.status(200).json({ message: "Venue deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = venueRouter;