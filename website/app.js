/* Global Variables */


let apiURLkey =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4cb6d458c8e69784bf3b8589209a199f}";

let APP_URL  = "http://localhost:8000"; 
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

const getData = async (url='')=>{
  const request = await fetch (url);
  try{
    const allData =await request.json()
    console.log(getData)
  }
  catch (error){
    console.log("error", error);
  }
};

/*
const http = apiURLkey;
const option = {
  method: "GET",
  header: {
    apiURLkey,
    "cache-controle": "no-cache",
  },
};
const req = http.request(option, function (res) {
  let wdata = [];
  res.on("data", function (wdata) {
    wdata.push(wdata);
  });
  res.on("end", function () {
    let body = Buffer.concat(wdata);
    console.log(body.toString());
  });
});
req.end();*/

/* Function to POST data */
const genId = document.getElementById("generate");
genId.onclick = function () {
  let zipId = document.getElementById("zip");
  let feel = document.getElementById("feelings");
  console.log(zipId.value + "__" + feel.value);

  let data = { "zip" :zipId.value, "feel": feel.textContent };

  
  let json = sendRequest(APP_URL+"/add", "POST", data)
    .then(data => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
  
  console.log(json);
};


async function sendRequest(url = '', method='GET', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

/* Function to GET Project Data */

