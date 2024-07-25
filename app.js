// In this app.js we are going to keep all the configuration related to express.js
const express = require("express"); // returns a function
const fs = require("fs");

const app = express(); // returns an object
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
// GET - api/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    staus: "success",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

//Create a server
const port = 3000;
app.listen(port, () => {
  // this call back func will be executed as soon as the server starts i.e as soon as the server ready to receive a request
  console.log("server has started...");
});
