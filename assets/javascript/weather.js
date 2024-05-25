const submit = document.querySelector("#submit");
const superDiv = document.querySelector(".containerDiv");
const weatherDiv = document.querySelector("#main-weather");
const APIKEY = "082d3b4ac7534762a9a13640242405";
const city = "Orlando";
const countryCode = "USA";
const state = "FL";
// const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${countryCode}&appid=appid=${APIKEY}&units=imperial`;
const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=London&days=8&aqi=yes&alerts=yes`;

submit.addEventListener("click", function () {
  console.log("I am her ");
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      
      for (let i = 1; i <6; i++) {
        const dailyDiv = document.createElement("div");
        dailyDiv.setAttribute("class", " col-2 p-3 m-3 vh-25 bg-danger");
        weatherDiv.append(dailyDiv);

        const dateHeader = document.createElement("h3");
        dateHeader.textContent = data.forecast.forecastday[i].date;
        dailyDiv.append(dateHeader);

        const w_condition = document.createElement("h4");
           w_condition.textContent =   data.forecast.forecastday[i].day.condition.text;
        dailyDiv.append(w_condition);

        const temp = document.createElement("h4");
        temp.textContent = data.forecast.forecastday[i].day.maxtemp_f;
        dailyDiv.append(temp);

        const icon = document.createElement("img");
        icon.setAttribute("class", "img-weather");
        icon.setAttribute(
          "src",
          `${data.forecast.forecastday[i].day.condition.icon}`);
          dailyDiv.append(icon);
      }
    });
});
