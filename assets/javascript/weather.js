const submit = document.querySelector("#submit");
const superDiv = document.querySelector(".containerDiv");
const weatherDiv = document.querySelector("#main-weather");
const tdyWeather = document.querySelector(".tdyDiv");
const tdyAir = document.querySelector(".airDiv")
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


      const tdyMainDiv= document.createElement("div");
      tdyMainDiv.setAttribute("class","col-3 ps-4 ");
      tdyWeather.append(tdyMainDiv);

      const citName = document.createElement("h3");
      citName.setAttribute("class","bi bi-geo-alt-fill")
      citName.textContent = `Now in ${data.location.name}`;
      tdyMainDiv.append(citName);

      const tdyTemp = document.createElement("h4");
      tdyTemp.textContent = `91 F`;
      tdyMainDiv.append(tdyTemp);

      const tdyIcon = document.createElement("img");
      tdyIcon.setAttribute("class","img-weather");
      tdyIcon.setAttribute("src",`https:${data.forecast.forecastday[0].day.condition.icon}`);
      tdyMainDiv.append(tdyIcon);

      
      const sunrise = document.createElement("h4");
      sunrise.textContent = `Sunrise: ${ data.forecast.forecastday[0].astro.sunrise}`;
      tdyMainDiv.append(sunrise);

      const sunset = document.createElement("h4");
      sunset.textContent = `Sunset: ${ data.forecast.forecastday[0].astro.sunset}`;
      tdyMainDiv.append(sunset);
      
      const uv =document.createElement("h5");
      uv.textContent=`UV: ${data.forecast.forecastday[0].day.uv}`;
      tdyAir.append(uv);
      let light = data.forecast.forecastday[0].day.uv
      if (light >=0 && light <= 4) {
        uv.style.color = 'green'
        console.log("UV is good")
      } else if (light >=5 && light <= 7){
        uv.style.color = 'orange'
        console.log("UV is high")
      } else if (light >= 8){
        uv.style.color = 'red'
        console.log("UV is extreme")
      } else {
        uv.style.color ='black'
        console.log("Indvalid UV valu")
      }

      const humidity = document.createElement("h5")
      humidity.textContent = `Humidity: ${data.forecast.forecastday[0].day.avghumidity}%`
      tdyAir.append(humidity)

      const wind = document.createElement("h5")
      wind.textContent = `Wind: ${data.forecast.forecastday[0].day.maxwind_mph}`
      tdyAir.append(wind)
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      for (let i = 1; i <8; i++) {
        const dailyDiv = document.createElement("div");
        dailyDiv.setAttribute("class", " daily   m-3  py-5   rounded-circle");
      dailyDiv.setAttribute(
          "style",
          `background-image: https:${data.forecast.forecastday[i].day.condition.icon}`);
        weatherDiv.append(dailyDiv);

        const dateHeader = document.createElement("h6");
      
        let date = dayjs(`${data.forecast.forecastday[i].date}`).format("ddd, DD")
        dateHeader.textContent = date;
        dailyDiv.append(dateHeader);

        const temp = document.createElement("h6");
        temp.textContent = `${data.forecast.forecastday[i].day.maxtemp_f} °F`;
        dailyDiv.append(temp);

        const w_condition = document.createElement("h6");
        w_condition.textContent =   data.forecast.forecastday[i].day.condition.text;
        console.log(data.forecast.forecastday[i].day.condition.icon)
        dailyDiv.append(w_condition);

        const icon = document.createElement("img");
        icon.setAttribute("class", "img-weather");
        icon.setAttribute(
          "src",
          `https:${data.forecast.forecastday[i].day.condition.icon}`);
          dailyDiv.append(icon);
      }
    });

});


