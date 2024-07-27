// In this app.js we are going to keep all the configuration related to express.js
const express = require("express"); // returns a function
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const moviesRouter = require('./Routes/moviesRoutes');

const app = express(); // returns an object
/**creating custom middleware */
const logger = (req, res, next) => {
  console.log("Custom middleware called");
  next();
};

/**express.json() is a middleware we are using here because in NODE JS by default we do not get the content of body in request object */
app.use(express.json()); // in morgan we passed dev as an argument for the format i.e there are 5 fomats dev,tiny,combined,common,sort.
app.use(morgan("dev")); // we are calling this morgan and express.json function because it is not a middleware in itself rather it returns a middleware and logger is in itself middleware that's why we have not called here we just passed logger
app.use(logger); // calling custom middleware by the help of use() method i.e. app.use(Custom Middleware func)
app.use((req, res, next) => {
  req["requestedAt"] = new Date().toISOString();
  next();
});

/**MOUNTING ROUTES */
app.use("/api/v1/movies",moviesRouter); // here we are mounting movieRouter middleware on /api/v1/movies path or this is also called as MOUNTING ROUTES. Here use() method has another overloaded version where the first arg should be a path and second argument be a middleware.

module.exports = app;

