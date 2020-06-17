/* Global Variables */

let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
let apiZip = "zip=";
let zipId = document.getElementById("zip");
let apiCon = ",us";
let apiKey = "&appid=4cb6d458c8e69784bf3b8589209a199f";
let dateDiv = document.getElementById("date");
let tempDiv = document.getElementById("temp");
let conDiv  = document.getElementById("content");
let apiFurl = apiURL + apiZip + zipId.value + apiCon + apiKey;
let feel = document.getElementById("feelings");

let APP_URL = "http://localhost:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
console.log(newDate);

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
/*document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const getWeather = document.getElementById("feelings").value;
  getFeel(apiURLkey, getWeather);
}
const getFeel = async (apiURLkey, getWeather) => {
  //const res = await fetch(apiURLkey );
};
console.log(apiURLkey);*/

/* Function to GET Web API Data*/

const getData = async (url = "") => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    console.log(getData.JSON);
  } catch (error) {
    console.log("error", error);
  }
};

const http = apiFurl;
const option = {
  method: "GET",
  header: {
    apiFurl,
    "cache-controle": "no-cache",
  },
};

/*const req = http.request(option, function(res) {
  let wdata = [];
  res.on("data", function (wdata) {
    wdata.push(wdata);
  });
  res.on("end", function () {
    let body = Buffer.concat(wdata);
    console.log(body.toString());
  });
});
req.end();
*/

/* Function to POST data */
const genId = document.getElementById("generate");
genId.onclick = function () {
  zipId;
  feel;
  console.log(zipId.value + "__" + feel.value);

  console.log(apiURL + apiZip + zipId.value + apiCon + apiKey);

  let data = { zip: zipId.value, feel: feel.value,newDate:newDate };
  console.log(APP_URL);
  console.log(data);
  let json = sendRequest(APP_URL + "/add", "POST", data).then((data) => {
  // JSON data parsed by `response.json()` call
   console.log(data);
   dateDiv.innerHTML=data.date;
   tempDiv.innerHTML = data.temp;
   conDiv.innerHTML=data.con;
    
  });
 

  console.log("JSON")
  console.log(json);
};

async function sendRequest(apiFurl = "", method = "GET", data = {}) {
  // Default options are marked with *
console.log(apiFurl);
  const response = await fetch(apiFurl, {
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
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log("Response");
  console.log(response.body);

  return response.json(); // parses JSON response into native JavaScript objects
}

/* Function to GET Project Data */

/*
let fjson= sendRequest(APP_URL+"/getData","GET",data).then((data) => { 
dat= newDate;
temp = json.stringify(main.temp);
con = feel.value;
console.log(data);
console.log(fjson);

});
*/