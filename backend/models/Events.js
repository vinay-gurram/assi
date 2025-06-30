const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    eventname: { 
        type: String, 
        required: true, 
        trim: true 
    },

    description: 
    { type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number,
         required: true 
        },

    language: { 
        type: String ,
        required: true
    },
    
    duration: { type: String ,required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);