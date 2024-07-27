const fs = require('fs');

const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

/**checkId is a param middleware => param middleware only runs for certain routes or endpoint or param*/
exports.checkId = (req,res,next,value) => {
  const id = value * 1;
  //FIND MOVIE BASED ON ID PARAMETER
  const movie = movies.find((movie) => movie.id === id); // return undefined if no value will match
  
  if (!movie)
    return res.status(404).json({
      status: "fail",
      message: `Movie with id ${id} is not found`,
    });

    next();
}
//ROUTE HANDLER FUNCTIONS
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    staus: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
  //Convert id to Number type as req.params gives an object of property and that property value is always a string.
  const id = req.params.id * 1;
  const movie = movies.find((movie) => movie.id === id); // return undefined if no value will match
  // if (!movie)
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with id ${id} is not found`,
  //   });
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

exports.createMovie = (req, res) => {
  // console.log(req.body); To get the content of body we use express.json() middleware
  const newId = movies[movies.length - 1].id + 1;
  let newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};

exports.updateMovie = (req, res) => {
  const contentToUpdate = req.body; // returns an object
  const id = req.params.id * 1;
  const movieToUpdate = movies.find((movie) => movie.id === id);
  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with id ${id} is not found`,
  //   });
  // }
  const index = movies.indexOf(movieToUpdate);
  Object.assign(movieToUpdate, contentToUpdate);
  movies[index] = movieToUpdate;
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  const id = +req.params.id;
  const movieToDelete = movies.find((movie) => movie.id === id);
  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with id ${id} is not found to delete`,
  //   });
  // }
  const index = movies.indexOf(movieToDelete);
  movies.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};