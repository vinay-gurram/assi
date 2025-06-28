
const mongoose = require("mongoose");

const ticketsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
      min: 1,
      max:20
     
    }
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Booking, BookingSchema");
module.exports = Booking;