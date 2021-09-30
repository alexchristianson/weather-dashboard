
var getCurrentWeather = function() {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "chicago" + "&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";
    fetch(apiURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(current) {
        console.log(current);    
    })     
};

var getForecast = function() {
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + "chicago" + "&appid=d3b85d453bf90d469c82e650a0a3da26";
    fetch(forecastApiUrl)
        .then(function(response) {
        return response.json();
    })
    .then(function(daily) {
        console.log(daily);
    })
};
getForecast();
getCurrentWeather();