let weather = {
  //retrieves the weather api
    apiKey: "03c941f24b9e60c0e097edaf08954414",
    //fetches the city name when searched for and looks through the api to find that city
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
      //error message if city doesn't exist
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    //retrieves data from the api and displays it
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    //search function calls fetchWeather to retrieve data from api
    search: function () {
      this.fetchWeather(document.querySelector(".bar").value);
    },
  };
  //searches when button is pressed
  document.querySelector(".searchbar button").addEventListener("click", function () {
    weather.search();
  });
  //searches when enter key is pressed
  document
    .querySelector(".bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  //initial state
  weather.fetchWeather("Torrance");