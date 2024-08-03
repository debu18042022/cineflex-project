const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("./Model/movieModel");
dotenv.config({ path: "./config.env" });

// CONNECT TO MONGODB
mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("Some error has occured");
  });

//READ MOVIES JSON FILE

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

//DELETE EXISTING MOVIE DOCUMENT FROM COLLECTION
const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
  } catch (err) {
    console.log(err.message);
  }
  process.exit(0);
};

const importData = async () => {
  try {
    await Movie.create(movies);
    console.log("Data Succcessfully inserted");
  } catch (err) {
    console.log("err.message : ", err.message);
  }
  process.exit(0);
};

console.log("process.argv", process.argv);

if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteMovies();
}
