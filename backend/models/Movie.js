const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieName : {
    type: String,
    required:true,
    
},
city : {
    type : String,
    required : true
},
capacity : {
    type : Number,
    default: 0,
    min: 0,
    max : 10
},
isFilled : {
    type : Boolean,
    default : false
},
eventType : {
    type : [String],
    required : true,
    enum : ["movie","show"]
}
})



module.exports = mongoose.model("Movie", movieSchema);