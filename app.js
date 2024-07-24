// In this app.js we are going to keep all the configuration related to express.js
const express = require("express"); // returns a function
const app = express(); // returns an object

//ROUTE =Http Method + URL
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World", status: 200 });
});

//Create a server
const port = 3000;
app.listen(port, () => {
  // this call back func will be executed as soon as the server starts i.e as soon as the server ready to receive a request
  console.log("server has started...");
});
