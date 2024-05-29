const submit = document.querySelector("#submit");
const todyTempDiv = document.querySelector(".temp");
const superDiv = document.querySelector(".containerDiv");
const weatherDiv = document.querySelector("#main-weather");
const tdyWeather = document.querySelector(".tdyDiv");
const tdyAir = document.querySelector(".airDiv");
const inputCity = document.querySelector("#city");

const countryCode = "USA";
const state = "FL";
const APIKEY = "082d3b4ac7534762a9a13640242405";
//add these values to get an alert
const localAdd = document.getElementById("local").value;
const destination = document.getElementById("destination").value;
const stateWea = document.getElementById("state").value;
const cityWea = document.getElementById("city").value;

// const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${countryCode}&appid=appid=${APIKEY}&units=imperial`;

// const cit1 = $("#city").val();

console.log(city);

function todayWeather(data) {
  const tdyMainDiv = document.createElement("div");
  tdyMainDiv.setAttribute("class", " col-2 pt-5 ps-4 ");
  tdyWeather.append(tdyMainDiv);
//Thomas Smith made the current temp and put color to it when the temp is in cerntain rage 
  const currentHourTemp = document.createElement("h4");
  currentHourTemp.textContent = `Current Temp ${data.current.temp_f}°F`;
  tdyMainDiv.append(currentHourTemp);
  let degree = data.current.temp_f;
  console.log('hello')

  if (degree >= 0 && degree <= 49) {
    currentHourTemp.style.color = "blue";
    console.log("cold");
  } else if (degree >= 50 && degree <= 79) {
    currentHourTemp.style.color = "yellow";
    console.log("warm");
  } else if (degree >= 80 && degree <= 120) {
    currentHourTemp.style.color ="red"
    console.log('hot')
  }else {
    currentHourTemp.style.color = "black";
    console.log('death')
  }

  const citName = document.createElement("h5");
  citName.textContent = `${data.location.name}`;
  tdyMainDiv.append(citName);

  const tdyIcon = document.createElement("img");
  tdyIcon.setAttribute("class", "img-weather");
  tdyIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[0].day.condition.icon}`
  );
  tdyMainDiv.append(tdyIcon);

  const sunrise = document.createElement("h6");
  sunrise.textContent = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
  tdyMainDiv.append(sunrise);

  const sunset = document.createElement("h6");
  sunset.textContent = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
  tdyMainDiv.append(sunset);
//Thomas Smith add uv with color, the humidiy, wind direction, wind speed, maxTemp, minTemp, and feelsLike
  const tdyAir = document.createElement("div");
  tdyAir.setAttribute("class", "airDiv col-2 pt-5 ");
  tdyWeather.append(tdyAir);
  const uv = document.createElement("h5");
  uv.textContent = `UV: ${data.current.uv}`;
  tdyAir.append(uv);
  let light = data.forecast.forecastday[0].day.uv;
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
}

function weekWeather(data) {
  for (let i = 1; i < 8; i++) {
    const dailyDiv = document.createElement("div");
    dailyDiv.setAttribute("class", " daily pt-4  m-3 rounded-circle");
    dailyDiv.setAttribute(
      "style",
      `background-image: https:${data.forecast.forecastday[i].day.condition.icon}`
    );
    weatherDiv.append(dailyDiv);

    const dateHeader = document.createElement("h6");

    let date = dayjs(`${data.forecast.forecastday[i].date}`).format("ddd, DD");
    dateHeader.textContent = date;
    dailyDiv.append(dateHeader);

    const temp = document.createElement("h6");
    temp.textContent = `${data.forecast.forecastday[i].day.maxtemp_f} °F`;
    dailyDiv.append(temp);

    const w_condition = document.createElement("h6");
    w_condition.textContent = data.forecast.forecastday[i].day.condition.text;
    console.log(data.forecast.forecastday[i].day.condition.icon);
    dailyDiv.append(w_condition);

    const icon = document.createElement("img");
    icon.setAttribute("class", "img-weather");
    icon.setAttribute(
      "src",
      `https:${data.forecast.forecastday[i].day.condition.icon}`
    );
    dailyDiv.append(icon);
  }
}

function initial() {
  weatherDiv.textContent = "";
  tdyWeather.textContent = "";
}

function weather(data) {
  initial();
  todayWeather(data);
  weekWeather(data);
}

submit.addEventListener("click", function () {
  const city = inputCity.value;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=8&aqi=yes&alerts=yes`;
//Thomas started this was made better by Houssine
  if (
    localAdd.trim() === "" ||
    destination.trim() === "" ||
    stateWea.trim() === "" ||
    cityWea.trim() === ""
  ) {
    alert("All inputs must be filled out");
  }
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      console.log(city);
      weather(data);
    });
});
