const submit = document.querySelector("#submit")
const APIKEY="b35eaaee37af480491012403242405";
const city ="Orlando";
const countryCode ="USA";
const state ='FL';
// const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${countryCode}&appid=appid=${APIKEY}&units=imperial`;
const url = 'https://api.weatherapi.com/v1/forecast.json?key=082d3b4ac7534762a9a13640242405&q=London&days=5&aqi=yes&alerts=yes';
submit.addEventListener('click', function(){
fetch(url)
.then(function(response){
    return response.json();

})
.then(function(data){
    console.log(data);
})
});