function updateCity(event) {
  event.preventDefault();

  // Change h1 innerHTML to input value.
  let searchCity = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}`;

  // Update temperature with open weather api.
  //--> api call
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function fetchForecast(coords) {
  let forcastApiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${forcastApiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function updateTemp(response) {
  celciusTemperature = response.data.main.temp;
  console.log(response);
  // update h1
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  // update temp
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(celciusTemperature)}`;

  // update humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  // update wind
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  // update icon
  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let now = new Date();
  let time = document.querySelector("#time");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${day}  ${hours}:${minutes}`;

  fetchForecast(response.data.coord);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", updateCity);

function showNewPosition(position) {
  console.log(position);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}
function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showNewPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentPosition);

function convertCelcius(event) {
  event.preventDefault();
  celcius.classList.add("selected");
  fahrenheit.classList.remove("selected");
  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(celciusTemperature);
}
function convertFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("selected");
  fahrenheit.classList.add("selected");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(fahrenheitTemperature);
}

function resolveDayName(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  // target the forecast row
  let forecastRow = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastColumns = "";
  dailyForecast.forEach((dayForecast, index) => {
    if (index > 5) return;

    forecastColumns =
      forecastColumns +
      `
    <div class="col forecast-col">
        ${resolveDayName(dayForecast.dt)} <br /><img
            class="forecast-icon"
            src="http://openweathermap.org/img/wn/${
              dayForecast.weather[0].icon
            }.png"
            alt=""
          /><br />
        <div class="degrees">${Math.round(
          dayForecast.temp.min
        )}° <strong> ${Math.round(dayForecast.temp.max)}°</strong></div>
    </div>
  `;
  });
  forecastRow.innerHTML = forecastColumns;
}

let apiKey = "d0482780e4fed960938a2f16ae7a19ee";

let celcius = document.querySelector("#celciusLink");
celcius.addEventListener("click", convertCelcius);

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", convertFahrenheit);

let celciusTemperature = null;
displayForecast();
