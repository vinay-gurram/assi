const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const authMiddleWare = require('../middleware/ authMiddleWare')

router.post("/addmovie", authMiddleWare, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/city/:city", async (req, res) => {
  try {
    const movies = await Movie.find({ city: req.params.city });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
