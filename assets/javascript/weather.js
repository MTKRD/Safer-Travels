// selectors for the elements
const submit = document.querySelector("#submit");
const todyTempDiv = document.querySelector(".temp");
const superDiv = document.querySelector(".containerDiv");
const weatherDiv = document.querySelector("#main-weather");
const tdyWeather = document.querySelector(".tdyDiv");
const tdyAir = document.querySelector(".airDiv");
const inputCity = document.querySelector("#city");
const tdydetail = document.querySelector(".tdy-detail");
const alertWeather = document.querySelector(".alert")
// const mapInput = document.querySelector(".tt-search-box-input");
// varaibles
const countryCode = "USA";
const state = "FL";
const APIKEY = "082d3b4ac7534762a9a13640242405";


function todayWeather(data) {
  // added div element to hold todays weather
  const tdyMainDiv = document.createElement("div");
  tdyMainDiv.setAttribute("class", " col-8 pt-5 ps-4 ");
  tdyWeather.append(tdyMainDiv);
  //Thomas Smith made the current temp and put color to it when the temp is in cerntain rage
  const currentHourTemp = document.createElement("h4");
  currentHourTemp.textContent = `Current Temp ${data.current.temp_f}°F`;
  tdyMainDiv.append(currentHourTemp);
  let degree = data.current.temp_f;

  if (degree >= 0 && degree <= 49) {
    currentHourTemp.style.color = "blue";
    console.log("cold");
  } else if (degree >= 50 && degree <= 79) {
    currentHourTemp.style.color = "orange";
    console.log("warm");
  } else if (degree >= 80 && degree <= 120) {
    currentHourTemp.style.color = "red";
    console.log("hot");
  } else {
    currentHourTemp.style.color = "black";
    console.log("death");
  }

  // added the header for city name and append it to the todays weather
  const citName = document.createElement("h5");
  citName.textContent = `${data.location.name}`;
  tdyMainDiv.append(citName);

  // added the img for icon and append it to the todays weather
  const tdyIcon = document.createElement("img");
  tdyIcon.setAttribute("class", "img-weather");
  tdyIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[0].day.condition.icon}`
  );
  tdyMainDiv.append(tdyIcon);
  // added the header for sunrise and append it to the todays weather
  const sunrise = document.createElement("h6");
  sunrise.textContent = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
  tdyMainDiv.append(sunrise);

  // added the header for sunset and append it to the todays weather
  const sunset = document.createElement("h6");
  sunset.textContent = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
  tdyMainDiv.append(sunset);
  //Thomas Smith add uv with color, the humidiy, wind direction, wind speed, maxTemp, minTemp, and feelsLike
  const tdyAir = document.createElement("div");
  tdyAir.setAttribute("class", "airDiv col-3 pt-5 ");
  tdyWeather.append(tdyAir);
  const uv = document.createElement("h5");
  uv.textContent = `UV: ${data.current.uv}`;
  tdyAir.append(uv);
  let light = data.forecast.forecastday[0].day.uv;
  // logic to changed the color base on the value of air quality
  if (light >= 0 && light <= 4) {
    uv.style.color = "green";
    console.log("UV is good");
  } else if (light >= 5 && light <= 7) {
    uv.style.color = "orange";
    console.log("UV is high");
  } else if (light >= 8) {
    uv.style.color = "red";
    console.log("UV is extreme");
  } else {
    uv.style.color = "black";
    console.log("Indvalid UV value");
  }
  // added the header for humidity and append it to the todays weather
  const humidity = document.createElement("h5");
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  tdyAir.append(humidity);

  const windDir = document.createElement("h5");
  windDir.textContent = `Wind Direction: ${data.current.wind_dir}`;
  tdyAir.append(windDir);

  const wind = document.createElement("h5");
  wind.textContent = `Wind: ${data.current.wind_mph} mph`;
  tdyAir.append(wind);

  const maxTemp = document.createElement("h5");
  maxTemp.textContent = `High Temp ${data.forecast.forecastday[0].day.maxtemp_f}°F`;
  tdyAir.append(maxTemp);

  const minTemp = document.createElement("h5");
  minTemp.textContent = `Low Temp ${data.forecast.forecastday[0].day.mintemp_f}°F`;
  tdyAir.append(minTemp);

  const feelLike = document.createElement("h5");
  feelLike.textContent = `Feels Like: ${data.current.feelslike_f}°F`;
  tdyAir.append(feelLike);

  const alertDiv = document.createElement("div");
  alertDiv.setAttribute("class","p-3");
  alertWeather.append(alertDiv);

  const event = document.createElement('h4');
  event.textContent = data.alerts.alert[0].event;
  alertDiv.append(event);

  let alertDate = dayjs(`${data.alerts.alert[0].effective}`).format("MMM,DD,2024 [at]  HH:mm:ss");
  const eventDate = document.createElement('h5');
  eventDate.textContent = `Affective: ${alertDate}`;
  alertDiv.append(eventDate);

  let alertExpires = dayjs(`${data.alerts.alert[0].expires}`).format("MMM,DD,2024 [at]  HH:mm:ss");
  const eventExpire = document.createElement('h5');
  eventExpire.textContent = `Expires: ${alertExpires}`;
  alertDiv.append(eventExpire);



  // console.log(data.alerts.alert[0].eDescription);
  // const eDescription = document.createElement('p');
  // eDescription.textContent = data.alerts.alert[0].desc;
  // alertWeather.append(eDescription);




   
}

// rendring html and its values
function weekWeather(data) {
  for (let i = 1; i < 8; i++) {
    // main for daily weather
    const dailyDiv = document.createElement("div");
    // set the classes
    dailyDiv.setAttribute("class", " daily pt-4  m-3 rounded-circle");
    dailyDiv.setAttribute(
      "style",
      `background-image: https:${data.forecast.forecastday[i].day.condition.icon}`
    );
    weatherDiv.append(dailyDiv);

    const dateHeader = document.createElement("h6");

    // formating the date using dayjs and append it
    let date = dayjs(`${data.forecast.forecastday[i].date}`).format("ddd, DD");
    dateHeader.textContent = date;
    dailyDiv.append(dateHeader);

    // heading for temp
    const temp = document.createElement("h6");
    temp.textContent = `${data.forecast.forecastday[i].day.maxtemp_f} °F`;
    dailyDiv.append(temp);

    // heading for condition and append it to daily div
    const w_condition = document.createElement("h6");
    w_condition.textContent = data.forecast.forecastday[i].day.condition.text;
    console.log(data.forecast.forecastday[i].day.condition.icon);
    dailyDiv.append(w_condition);

    // heading for the icon and append it to daily div
    const icon = document.createElement("img");
    icon.setAttribute("class", "img-weather");
    icon.setAttribute(
      "src",
      `https:${data.forecast.forecastday[i].day.condition.icon}`
    );
    dailyDiv.append(icon);
  }
}

// function to initialize the page before displaying data
function initial() {
  weatherDiv.textContent = "";
  tdyWeather.textContent = "";
}

// function that calls other function of rendring
function weather(data) {
  initial();
  todayWeather(data);
  weekWeather(data);
}

searchBoxInstance.on("tomtom.searchbox.resultselected", function () {
  // submit.addEventListener("click", function () {
  // getting input from users

  console.log("this has been excuted in weather");
  // const city = inputCity.value;
  city = localStorage.getItem("city");
  let lat = localStorage.getItem("lat");
  let lon = localStorage.getItem("lon");

  url = `http://api.weatherapi.com/v1/forecast.json?key=082d3b4ac7534762a9a13640242405&q=${lat},${lon}&days=8&aqi=yes&alerts=yes`;
  // const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=8&aqi=yes&alerts=yes`;


  {
  }
  // fetch data
  fetch(url)
    .then(function (response) {
      // verify the status of response, if 200 return data if not display the correspondon page

      if (response.status !== 200) {
        if (response.status === 500) {
          document.location.replace("assets/pages/500.html");
        } else {
          console.log("bad request");
          document.location.replace("assets/pages/error.html");
        }
      } else {
        return response.json();
      }
    })
    // manuiplate data and call other function with required paramaters and arguments
    .then(function (data) {
      console.log(data);

      console.log(city);
      weather(data);
    });
});
