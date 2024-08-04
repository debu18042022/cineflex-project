const Movie = require("./../Model/movieModel");

//ROUTE HANDLER FUNCTIONS
exports.getAllMovies = async (req, res) => {
  try {
    // console.log(req.query);
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    

    // const movies = await Movie.find({"duration":{$gte:90},"ratings":{$gte:7},"price":{$lte:100}});
    // const movies = await Movie.find({duration: +req.query.duration,ratings: +req.query.ratings});
    // const movies1 = (await Movie.find().where("duration").gte(req.query.duration).where("ratings").gte(req.query.ratings).where("price")).filter(100);

    const movies = await Movie.find(queryObj);
    
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

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      //findByIdAndUpdate method is going to return a resolve promise
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        movie: updatedMovie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
