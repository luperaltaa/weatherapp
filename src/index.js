function updateCity(event) {
  event.preventDefault();

  // Change h1 innerHTML to input value.
  let searchCity = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}`;

  // Update temperature with open weather api.
  //--> api call
  let apiKey = "d0482780e4fed960938a2f16ae7a19ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function updateTemp(response) {
  console.log(response);
  // update h1
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  // update temp
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(response.data.main.temp)}°C`;

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
  let minutes = now.getMinutes();
  time.innerHTML = `${day}  ${hours}:${minutes}`;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", updateCity);

function showNewPosition(position) {
  console.log(position);
  let apiKey = "d0482780e4fed960938a2f16ae7a19ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}
function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showNewPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentPosition);
