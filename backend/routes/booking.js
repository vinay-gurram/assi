const express = require("express");
const bookingRouter = express.Router();
const Booking = require("../models/Booking");
const Show = require("../models/Show");
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");

bookingRouter.post("/book-ticket", authMiddleware, async (req, res) => {
  try {
    const { showId, selectedSeats } = req.body;
    const userId = req.user.id;

    if (!showId || !selectedSeats || selectedSeats.length === 0) {
      return res.status(400).json({ message: "Show ID and seats are required" });
    }

   
    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: "Show not found" });

    // Check for already booked seats
    const alreadyBooked = selectedSeats.some(seat => show.bookedSeats.includes(seat));
    if (alreadyBooked) {
      return res.status(409).json({ message: "Some selected seats are already booked" });
    }

    // Fetch movie to get price
    const movie = await Movie.findById(show.movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    
    const totalPrice = selectedSeats.length * movie.price;

    
    show.bookedSeats.push(...selectedSeats);
    await show.save();

    // Create booking
    const booking = new Booking({
      userId,
      movieId: movie._id,
      showId: show._id,
      seats: selectedSeats,
      totalPrice
    });

    await booking.save();

    return res.status(201).json({ message: "Booking successful", booking });

  } catch (error) {
    return res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

bookingRouter.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate("movieId", "moviename language")
      .populate("showId", "venue startTime");

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = bookingRouter;