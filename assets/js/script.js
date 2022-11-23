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

// Previous Cities will show under search 
$("#Searchprevious").click(function() {
    let cityName = event.target.value;
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
})

// utilize local storage functionality so user can have information saved in local storage // 
if (localStorage.getItem("localWeatherSearches")) {
    citiesArray = JSON.parse(localStorage.getItem("localWeatherSearches"));
    writeSearchHistory(citiesArray);
} else {
    citiesArray = [];
};

// added a function to Clear Local Storage whenever user clicks clear
$("#clear").click(function() {
    localStorage.clear('localWeatherSearches');
});

// call API to retrieve current weather information by city name //
function returnCurrentWeather(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`;

    $.get(queryURL).then(function(response){
        // Current Date 
        let currTime = new Date(response.dt*1000);
        // Displays Weather Icon 
        let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

        currWeatherDiv.html(`
        <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp}&#176;F</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} mph</p>
        `, returnUVIndex(response.coord))
        createHistoryButton(response.name);
    })
};

// Call API for weather forecast 
function returnWeatherForecast(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=ef97f3de9f468cfe0aff41d0a911b1a4`;

    $.get(queryURL).then(function(response){
        let forecastInfo = response.list;
        forecastDiv.empty();
        $.each(forecastInfo, function(i) {
            if (!forecastInfo[i].dt_txt.includes("12:00:00")) {
                return;
            }
            // dates for forecast
            let forecastDate = new Date(forecastInfo[i].dt*1000);
            // display weather Icon
            let weatherIcon = `https://openweathermap.org/img/wn/${forecastInfo[i].weather[0].icon}.png`;
            // When searching, append data to a five-day forecast.
            forecastDiv.append(`
            <div class="col-md">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h4>${forecastDate.getMonth()+1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                        <img src=${weatherIcon} alt="Icon">
                        <p>Temp: ${forecastInfo[i].main.temp}&#176;F</p>
                        <p>Humidity: ${forecastInfo[i].main.humidity}%</p>
                    </div>
                </div>
            </div>
            `)
        })
    })
};



