const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Movie" 
  },
  
  venue: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Venue"
     },
     
  time: Date,
  bookedSeats: [Number],
});

module.exports = mongoose.model("Show", showSchema);
