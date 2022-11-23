// Openweather API Key //
const apiKey = "ef97f3de9f468cfe0aff41d0a911b1a4";
// Get Current Weather Information //
var currWeatherDiv = $("#Weathercurrent");
// Five Day Forcast Information //
var forecastDiv = $("#Forecastweather");
// Cities array //
var citiesArray;

// City search when the user clicks the search icon
$("#Citysubmit").click(function() {
    event.preventDefault();
    let cityName = $("#Inputcity").val();
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
});