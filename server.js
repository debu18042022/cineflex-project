const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// console.log(app.get("env")); // By default express works in development environment.
//Q - here might raise a question that why we are console here in ServiceWorkerRegistration.js file why not app.js file ?
//A - Just because earlier we have learned that we are going to use this app.js for express related thing.Now environment variable is not something related to express it something related to Node Js. So everything which is related to application but not related to Express Js that we will write the servrer.js file.
// Use SET NODE_ENV=DEVELOPMENT in Command Prompt (cmd.exe).
// Use $env:NODE_ENV = "development" in PowerShellby this  code we can set the environment variable through the terminal.
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(process.env);

/**CCONNECTION WITH DATABASE : first argument should be a CONN_STR*/
mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log(conn);
    console.log("DB CONNECTION SUCCESSFUL");
  })
  .catch((err) => {
    console.log("Some Error Has Occured");
  });

//Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // this call back func will be executed as soon as the server starts i.e as soon as the server ready to receive a request
  console.log("server has started...");
});
