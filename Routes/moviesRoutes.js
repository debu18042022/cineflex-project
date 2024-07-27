const express = require("express");
const {getAllMovies,createMovie,getMovie,updateMovie,deleteMovie} = require('../Controllers/moviesController');

const router = express.Router(); // it returns a middleware

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);
module.exports = router;    
