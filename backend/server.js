

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const venueRoutes = require("./routes/Venue");
const showRoutes = require("./routes/Show");
const bookingRoutes = require("./routes/booking");

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({extended:true}))


app.use(express.json());

app.get("/boooke", (req, res) => {
    res.send(" Welcome to BookMyShow Backend!");
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(" Welcome to BookMyShow Backend!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
