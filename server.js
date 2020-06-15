// Setup empty JS object to act as endpoint for all routes
projectData = {
  asdsda: "",
};

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

app.listen(8000, function () {
  console.log("Listening at 8000");
});

app.post("/add", function (req, res) {
  console.log("Request");
  console.log("============");
  console.log(req.body);
  // Send to whether
  //    res.send('hello world')
});

app.get("/getData", function (req, res) {
  res.send(projectData);
});

// Initialize the main project folder

app.use(express.static("website"));

app.use("/api", (request, response) => {
  console.log("I've got a request");
  console.log(request.body);
  const json = request.body;
  response.json({
    status: "success",
    latitude: json.zipId,
    longitude: json.feel,
  });
});

// Setup Server
