var getCurrentWeather = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=f335f366e0ef6a0f6345f01a604b40bd")
    .then(function(response) {
        return response.json()
    })
    .then(function(res) {
        console.log(res);
        getForecast(res.coord.lat, res.coord.lon)
    })
};

var getForecast = function(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=f335f366e0ef6a0f6345f01a604b40bd")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        var forecastContainter = document.querySelector("#forecast");
        for(var i = 0; i < data.daily.length - 3; i++) {
            var tempDiv = document.createElement("div");
            tempDiv.textContent = "temp: " + data.daily[i].temp.day;
            var windDiv = document.createElement("div");
            windDiv.textContent = "wind: " + data.daily[i].wind_speed;
            var humidDiv = document.createElement("div");
            humidDiv.textContent = "humidity: " + data.daily[i].humidity;

            var forecastCard = document.createElement("div");
            forecastCard.classList.add("col-2", "card");

            forecastCard.append(tempDiv, windDiv, humidDiv);

            forecastContainter.append(forecastCard);

    }
    }
    )}

getCurrentWeather();