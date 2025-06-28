const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  city: String,
  totalSeats: Number,
});

module.exports = mongoose.model("Venue", venueSchema);
