const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../Controllers/moviesController");

const router = express.Router(); // it returns a middleware so here router will be a middleware.
/**param middleware is a special middleware which only runs for certain route parameters */
// router.param("id", checkId); // checkedId is a param middleware

router.route("/").get(getAllMovies).post(createMovie); // here we are chaining two middleware and thease middeleware will be execued as they defined in tht order, we can chain more middleware for e.g, before validate the body we can also check the user who is trying to create a movie object whether that user is loggedIn or not so for that we can create another midddleware that should execute before the validateBody middleware.
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
