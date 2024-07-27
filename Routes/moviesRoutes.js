const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  checkId,
} = require("../Controllers/moviesController");

const router = express.Router(); // it returns a middleware so here router will be a middleware.
/**param middleware is a special middleware which only runs for certain route parameters */
router.param("id", checkId); // checkedId is a param middleware

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
