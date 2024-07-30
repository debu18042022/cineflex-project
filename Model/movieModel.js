const mongoose = require("mongoose");

/**define Schema */
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  duration: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
});

/**Movie is a model name and whatever we pass as an argument i.e Movie is a colection name */
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
