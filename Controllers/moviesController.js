const Movie = require("./../Model/movieModel");

/**creating a document */
const testMovie = new Movie({
  name: "Border",
  description:
    "Major Ram is given orders to go undercover as a college student to protect a general's daughter from a rogue soldier. He even has to fulfil his dying father's desire to reconcile with his family.",
  duration: 179,
  ratings: 4.9,
});

/**by calling a save() method with testDocument it inserts the document in the collection Movies NOTE: save() method returns promise */
testMovie
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR OCCURED :", err);
  });

exports.validateBody = (req, res, next) => {
  if (!req.body.name || !req.body.releaseYear) {
    // checking user entered a valid movie data or not here name and releaseYear is mandatory
    return res.status(400).json({
      staus: "fail",
      message: "Not a valid movie data",
    });
  }
  next();
};

//ROUTE HANDLER FUNCTIONS
exports.getAllMovies = (req, res) => {};

exports.getMovie = (req, res) => {};

exports.createMovie = (req, res) => {};

exports.updateMovie = (req, res) => {};

exports.deleteMovie = (req, res) => {};
