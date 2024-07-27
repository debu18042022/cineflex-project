// In this app.js we are going to keep all the configuration related to express.js
const express = require("express"); // returns a function
const fs = require("fs");
const morgan = require("morgan"); // HTTP request logger middleware for node.js

const app = express(); // returns an object
/**creating custom middleware */
const logger = (req, res, next) => {
  console.log("Custom middleware called");
  next();
};
/**express.json() is a middleware we are using here because in NODE JS by default we do not get the content of body in request object */
app.use(express.json()); // in morgan dev is a format i.e there are 5 fomats dev,tiny,combined,common,sort.
app.use(morgan("")); // we are calling this morgan and express.json function because it is not a middleware in itself rather it returns a middleware and logger is in itself middleware that's why we have not called here we just passed logger
app.use(logger); // calling custom middleware by the help of use() method i.e. app.use(Custom Middleware func)
app.use((req, res, next) => {
  req["requestedAt"] = new Date().toISOString();
  next();
});
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//ROUTE HANDLER FUNCTIONS
const getAllMovies = (req, res) => {
  res.status(200).json({
    staus: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

const getMovie = (req, res) => {
  //Convert id to Number type as req.params gives an object of property and that property value is always a string.
  const id = req.params.id * 1;
  const movie = movies.find((movie) => movie.id === id); // return undefined if no value will match
  if (!movie)
    return res.status(404).json({
      status: "fail",
      message: `Movie with id ${id} is not found`,
    });
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

const createMovie = (req, res) => {
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

const updateMovie = (req, res) => {
  const contentToUpdate = req.body; // returns an object
  const id = req.params.id * 1;
  const movieToUpdate = movies.find((movie) => movie.id === id);
  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id ${id} is not found`,
    });
  }
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

const deleteMovie = (req, res) => {
  const id = +req.params.id;
  const movieToDelete = movies.find((movie) => movie.id === id);
  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id ${id} is not found to delete`,
    });
  }
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

// // GET - api/v1/movies
// app.get("/api/v1/movies", getAllMovies);

// // GET - api/v1/movies/id => here id is a parameter. there can be a multiple routes also like /api/v1/movies/id/name/x => /api/v1/movies/:id:name:x
// app.get("/api/v1/movies/:id", getMovie);

// // POST - api/v1/movies there can be a multiple routes also like
// app.post("/api/v1/movies", createMovie);

// // PATCH - "/api/v1/movies/id";
// app.patch("/api/v1/movies/:id", updateMovie);

// // DELETE - /api/v1/movies/id
// app.delete("/api/v1/movies/:id", deleteMovie);

const moviesRouter = express.Router(); // it returns a middleware

moviesRouter.route("/").get(getAllMovies).post(createMovie);
moviesRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

/**MOUNTING ROUTES */
app.use("/api/v1/movies",moviesRouter); // here we are mounting movieRouter middleware on /api/v1/movies path or this is also called as MOUNTING ROUTES. Here use() method has another overloaded version where the first arg should be a path and second argument be a middleware.

//Create a server
const port = 3000;
app.listen(port, () => {
  // this call back func will be executed as soon as the server starts i.e as soon as the server ready to receive a request
  console.log("server has started...");
});
