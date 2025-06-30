const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({

  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Movie",
     required: true 
    },

  venue: {
     type: String, 
     required: true
     },

  city: {
     type: String, 
     required: true
     },

  startTime: { 
    type: Date, 
    required: true 
  },
  
  bookedSeats: [{ type: String }] 
});

module.exports = mongoose.model("Show", showSchema);