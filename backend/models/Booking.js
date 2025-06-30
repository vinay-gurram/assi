const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { 

    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Movie",
     required: true 
    },

  showId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Show", 
    required: true 
  },

  seats: [{ type: String }],

  totalPrice: Number
  
});

module.exports = mongoose.model("Booking", bookingSchema);