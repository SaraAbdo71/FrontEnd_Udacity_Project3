projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
// Cors for cross origin allowance
const cors = require("cors");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.listen(8000, function () {
  console.log("Listening at 8000");
});

app.post("/add", function (req, response) {
  projectData = {
    date: req.body.date,
    temp: req.body.main.temp,
    zip: req.body.zip,
    content: req.body.content,
  };
  console.log(projectData);
  return response.send({ type: "success" });
});

app.get("/getData", function (req, res) {
  res.send(projectData);
});
