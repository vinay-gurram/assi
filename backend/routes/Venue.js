const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");


router.post("/",  async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
