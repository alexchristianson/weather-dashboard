// global variables
var citySearchBar = document.querySelector("#search-bar");
var citySearchInput = document.querySelector("#search-city")
var searchButton = document.querySelector("#search-button");
var cities = [];
var forecastContainter = document.querySelector("#forecast-row");
var currentWeatherEl = document.querySelector("#weather");

var citySearchHandler = function(event) {
    

    var city = citySearchInput.value.trim();

    if (city) {
        getCurrentWeather(city);
        cities.unshift({city});
        citySearchInput.value = "";
    }
    else {
        alert("Please enter a city");
    }

    saveCity();
};

var saveCity = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

// get city lat and lon function
var getCurrentWeather = function(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f335f366e0ef6a0f6345f01a604b40bd")
    .then(function(response) {
        return response.json()
    })
    .then(function(res) {
        console.log(res);
        getForecast(res.coord.lat, res.coord.lon, city);
    })

    // clear old content from page
    forecastContainter.textContent = "";
    currentWeatherEl.textContent = "";
};

// get and display forecast information function
var getForecast = function(lat, lon, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=f335f366e0ef6a0f6345f01a604b40bd")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        
        console.log(data);

        
        for(var i = 1; i < data.daily.length - 2; i++) {
            var dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "date");
            dateDiv.textContent = moment.unix(data.daily[i].dt).format("MMM D, YYYY");
            var forecastIcon = document.createElement("img");
            forecastIcon.setAttribute("src",  `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
            forecastIcon.setAttribute("class", "icon");
            var tempDiv = document.createElement("div");
            tempDiv.textContent = "Temp: " + data.daily[i].temp.day + "° F";
            var windDiv = document.createElement("div");
            windDiv.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
            var humidDiv = document.createElement("div");
            humidDiv.textContent = "Humidity: " + data.daily[i].humidity + " %";

            var forecastCard = document.createElement("div");
            forecastCard.classList.add("col-2", "card");
            forecastCard.setAttribute("id", "forecast-card");

            forecastCard.append(dateDiv, forecastIcon, tempDiv, windDiv, humidDiv);
            forecastContainter.append(forecastCard);
    }

    
    var cityName = document.createElement("h2");
    var currentDate = document.createElement("span");
    currentDate.setAttribute("class", "date");
    currentDate.textContent =  moment(data.current.dt.value).format("MMM D, YYYY");
    cityName.textContent = city.toUpperCase();
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "icon");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
    var currentTemp = document.createElement("div");
    currentTemp.textContent = "Temp: " + data.current.temp + "° F";
    var currentWind = document.createElement("div");
    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    var currentHumid = document.createElement("div");
    currentHumid.textContent = "Humidity: " + data.current.humidity + " %";
    var currentUVI = document.createElement("div");
    var uvIndex = document.createElement("span")
    

    if (data.current.uvi < 3) {
        uvIndex.innerHTML = "Favorable";
        uvIndex.setAttribute("class", "bg-success")
    } else if (data.current.uvi < 7) {
        uvIndex.innerHTML = "Moderate";
        uvIndex.setAttribute("class", "bg-warning")
    } else {
        uvIndex.innerHTML = "Severe";
        uvIndex.setAttribute("class", "bg-danger")
    }
    ;

    currentUVI.textContent = "UV Index: " + data.current.uvi + " ";
    currentUVI.append(uvIndex)
    currentWeatherEl.append(cityName, currentDate, weatherIcon, currentTemp, currentWind, currentHumid, currentUVI);
    })
};



searchButton.addEventListener("click", citySearchHandler);