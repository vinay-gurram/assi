const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();


app.use(express.json());

const authUser = require("./routes/authuser.js");
const authMovie = require('./routes/authmovie.js');
const authVenueRouter = require('./routes/authvenue.js');
const authShow = require('./routes/authshow.js')
const authBooking = require('./routes/authbooking.js')
app.use("/api", authVenueRouter);
app.use("/api", authUser);
app.use("/api",authMovie);
app.use("/api",authBooking)
app.use("/api",authShow)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });

app.listen(8002, () => {
  console.log("Server is running on port 8002");
});