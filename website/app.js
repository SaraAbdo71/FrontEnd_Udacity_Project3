/* Global Variables */

const APP_URL = "http://localhost:8000";

const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiZip = "zip=";
const zipId = document.getElementById("zip");
const apiCon = ",us";
const apiKey = "4cb6d458c8e69784bf3b8589209a199f";
const apiUnit = "imperial";

const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const conDiv = document.getElementById("content");
const feel = document.getElementById("feelings");
const genId = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

function getData() {
  fetch(APP_URL + "/getData")
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      if (data.date) {
        dateDiv.innerHTML = data.date;
        tempDiv.innerHTML = data.temp;
        conDiv.innerHTML = data.content;
      }
    });
}

/* Function to POST data */
genId.onclick = function () {
  const reqData = { zip: zipId.value + ",us", appid: apiKey, units: apiUnit };
  var params = new URLSearchParams(reqData).toString();
  fetch(apiURL + params)
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);
      if (data.cod !== "404") {
        data.zip = zipId.value;
        data.content = feel.value;
        data.date = newDate;
        sendRequest(APP_URL + "/add", data, "POST").then((data) => {
          getData();
        });
      }
    })
    .catch(function () {
      // catch any errors
    });
};

async function sendRequest(apiFurl, data = {}, method = "GET") {
  // Default options are marked with *
  var options = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  if (method != "GET") {
    options.body = JSON.stringify(data); // body data type must match "Content-Type" header
  }
  const response = await fetch(apiFurl, options);

  return response.json(); // parses JSON response into native JavaScript objects
}

getData();
