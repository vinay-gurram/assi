const express = require("express");
const movieRouter = express.Router();
const Movie = require("../models/movie");
const authMiddleware = require('../middleware/authMiddleWare');


movieRouter.post("/add-movie", authMiddleware, async (req, res) => {
  const { moviename, description, price, language, duration,city } = req.body;

  
  if (!moviename || !description || !price || !language || !duration || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const movieExists = await Movie.findOne({ moviename });
    if (movieExists) {
      return res.status(409).json({ message: "Movie already exists" });
    }
    const newMovie = new Movie({ moviename, description, price, language, duration ,city});
    await newMovie.save();
    return res.status(201).json({ message: "Movie registered successfully", movie: newMovie });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

movieRouter.get("/all-movies/:city", authMiddleware, async (req, res) => {
  try {
    const city = req.params.city
    const movies = await Movie.find({city});
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


movieRouter.get("/movie-details/:id", authMiddleware,async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id)
        if(!movie){
            return res.status(404).json({message:"Movies Not found!"})
        }
        return res.status(200).json({movie})
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }

});

movieRouter.put("/update-movie/:id" , authMiddleware , async(req,res)=>{
    try {
        const movieId = req.params.id;
        const updates = req.body ; 
        const movie = await Movie.findById(movieId);
        if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
        }
        const updatedMovie = await Movie.findByIdAndUpdate(movieId , updates , {new:true});
        return res.status(200).json({ message: "Movie Updated", movie: updatedMovie });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});
movieRouter.delete("/delete-movie/:id", authMiddleware, async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found or already deleted" });
    }

    return res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });
  } 
  catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = movieRouter;

