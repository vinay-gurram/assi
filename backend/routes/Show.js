const express = require("express");
const showRouter = express.Router();
const Show = require("../models/Show");
const authMiddleware = require("../middleware/authMiddleware");


showRouter.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const { movieId, venue, city, startTime } = req.body;

    if (!movieId || !venue || !city || !startTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const rows = ["A", "B", "C"];
    const seatsPerRow = 10;
    const bookedSeats = []; 

    const newShow = new Show({
      movieId,
      venue,
      city,
      startTime: new Date(startTime),
      bookedSeats
    });

    await newShow.save();
    return res.status(201).json({ message: "Show added successfully", show: newShow });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


showRouter.put("/update-show/:id", authMiddleware, async (req, res) => {
  try {
    const showId = req.params.id;
    const updates = req.body;

    const updatedShow = await Show.findByIdAndUpdate(showId, updates, { new: true });

    if (!updatedShow) {
      return res.status(404).json({ message: "Show not found" });
    }

    return res.status(200).json({ message: "Show updated successfully", show: updatedShow });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


showRouter.delete("/delete-show/:id", authMiddleware, async (req, res) => {
  try {
    const showId = req.params.id;

    const deletedShow = await Show.findByIdAndDelete(showId);

    if (!deletedShow) {
      return res.status(404).json({ message: "Show not found" });
    }

    return res.status(200).json({ message: "Show deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


module.exports = showRouter;