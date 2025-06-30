const express = require("express");
const eventRouter = express.Router();
const Event = require("../models/events");
const authMiddleware = require('../middleware/authMiddleWare');

eventRouter.get("/all-events/:city", authMiddleware, async (req, res) => {
  try {
    const city = req.params.city;
    const events = await Event.find({ city });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


eventRouter.get("/event-details/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }
    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


eventRouter.put("/update-event/:id", authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
    return res.status(200).json({ message: "Event updated", event: updatedEvent });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


eventRouter.delete("/delete-event/:id", authMiddleware, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found or already deleted" });
    }

    return res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = eventRouter;