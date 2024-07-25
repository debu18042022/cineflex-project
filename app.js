// In this app.js we are going to keep all the configuration related to express.js
const express = require("express"); // returns a function
const fs = require("fs");

const app = express(); // returns an object
/**express.json() is a middleware we are using here because in NODE JS by default we do not get the content of body in request object */
app.use(express.json());
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
// GET - api/v1/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    staus: "success",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

// GET - api/v1/movies/id => here id is a parameter. there can be a multiple routes also like /api/v1/movies/id/name/x => /api/v1/movies/:id:name:x
app.get("/api/v1/movies/:id", (req, res) => {
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
});

// POST - api/v1/movies there can be a multiple routes also like 
app.post("/api/v1/movies", (req, res) => {
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
});

//Create a server
const port = 3000;
app.listen(port, () => {
  // this call back func will be executed as soon as the server starts i.e as soon as the server ready to receive a request
  console.log("server has started...");
});
