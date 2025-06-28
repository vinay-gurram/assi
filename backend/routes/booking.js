const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Show = require("../models/Show");


router.post("/", async (req, res) => {
  const { showId, seats } = req.body;
  try {
    const show = await Show.findById(showId);

    const isSeatTaken = seats.some((seat) => show.bookedSeats.includes(seat));
    if (isSeatTaken) return res.status(400).json({ message: "Seat already booked" });

    show.bookedSeats.push(...seats);
    await show.save();

    const booking = new Booking({
      user: req.user.id,
      show: showId,
      seats,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("show");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
