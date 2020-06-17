var http = require("https");
// Setup empty JS object to act as endpoint for all routes
projectData = {};
let apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiCon = ",us";
let apiKey = "&appid=4cb6d458c8e69784bf3b8589209a199f";

// let apiFurl = apiURL + apiZip + zipId.value + apiCon + apiKey;

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
// Cors for cross origin allowance
const cors = require("cors");
const { json } = require("body-parser");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(8000, function () {
  console.log("Listening at 8000");
});

app.post("/add", function (req, response) {
  console.log("Request");
  console.log("============");
  console.log(req.body);
  console.log("============");

  var url = apiURL + req.body.zip + apiCon + apiKey;
  console.log(url);
  let reqs = http.get(url, function (res) {
    let wdata = [];
    res
      .on("data", function (dd) {
        wdata.push(dd);
      })
      .on("end", function () {
        console.log("END");
        let body = Buffer.concat(wdata);
        let temp_data = JSON.parse(body.toString());
        console.log("-------------");
        console.log(temp_data);
        if(temp_data.cod=='404'){
        projectData = {
          date: req.body.newDate,
          temp: "Not Found",
          zip: req.body.zip,
          con: req.body.feel
        };
        
       }else
       {
        projectData = {
          date: req.body.newDate,
          temp: temp_data.main.temp,
          zip: req.body.zip,
          con: req.body.feel
        };
       }
        console.log("PROEJCT DATA");
        console.log(projectData);
        response.send(projectData);
      });
  });

});

app.get("/getData", function (req, res) {

  JSON.stringify(projectData);
  console.log("****************************");
  console.log(projectData);
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
