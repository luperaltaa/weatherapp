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
  // update weather
  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].main;

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
