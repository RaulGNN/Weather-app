let weather = {
    apiKey: '2a0f2dacc84a7a132f11cb54a7ea3c10',
    fetchWeather: function (city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=" + this.apiKey)

            .then(response => {
                if (!response.ok) {
                    alert("App is not working at the moment. Sorry for the inconvenience.");
                    throw new Error("App is not working at the moment. Sorry for the inconvenience.")
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
            
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description.charAt(0).toUpperCase() + description.slice(1);
        document.querySelector(".temp").innerText = Math.floor(temp) + "ºC";
        document.querySelector(".humidity").innerText = "Rain: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + Math.floor(speed) + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    document.querySelector(".search-bar").value = "";
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        document.querySelector(".search-bar").value = "";
    }
});

weather.fetchWeather("London");
