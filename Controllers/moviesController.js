const Movie = require("./../Model/movieModel");

/**creating a document */
// const testMovie = new Movie({
//   name: "Border",
//   description:
//     "Major Ram is given orders to go undercover as a college student to protect a general's daughter from a rogue soldier. He even has to fulfil his dying father's desire to reconcile with his family.",
//   duration: 179,
//   ratings: 4.9,
// });

/**by calling a save() method with testDocument it inserts the document in the collection Movies NOTE: save() method returns promise */
// testMovie
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR OCCURED :", err);
//   });

// exports.validateBody = (req, res, next) => {
//   if (!req.body.name || !req.body.releaseYear) {
//     // checking user entered a valid movie data or not here name and releaseYear is mandatory
//     return res.status(400).json({
//       staus: "fail",
//       message: "Not a valid movie data",
//     });
//   }
//   next();
// };

//ROUTE HANDLER FUNCTIONS
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies: movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    // const movie = await Movie.find({ _id: req.params.id });  // internammy findByID() method works like this
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  try {
    console.log(req.body);
    const movie = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        movie: movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateMovie = (req, res) => {};

exports.deleteMovie = (req, res) => {};
