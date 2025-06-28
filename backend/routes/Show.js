const express = require("express");
const router = express.Router();
const Show = require("../models/Show");


router.post("/",  async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/movie/:movieId", async (req, res) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId }).populate("venue");
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
