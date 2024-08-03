const mongoose = require("mongoose");

/**define Schema */
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required filed!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required filed!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "duration is required filed!"],
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "releaseYear is required filed!"],
  },
  releaseDate: {
    type: Date,
    required: [true, "releaseDate is required filed!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: [true, "genres is required filed!"],
  },
  director: {
    type: [String],
    required: [true, "director is required filed!"],
  },
  coverImage: {
    type: String,
    required: [true, "coverImage is required filed!"],
  },
  actors: {
    type: [String],
    required: [true, "actors is required filed!"],
  },
  price: {
    type: Number,
    required: [true, "price is required filed!"],
  },
});

/**Movie is a model name and whatever we pass as an argument i.e Movie is a colection name */
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
