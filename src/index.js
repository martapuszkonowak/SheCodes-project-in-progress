let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  let currentTime = `${hours}:${minutes}`;
  let currentDayAndTime = `${currentDay} ${currentTime}`;
  return currentDayAndTime;
}

let currentDayAndTime = document.querySelector("h5");
currentDayAndTime.innerHTML = formatDate();

function searchCity(event) {
  let cityInput = document.querySelector("#city-input");
  displayCity(cityInput.value);
  getTemperature(cityInput.value);
  event.preventDefault();
}

function displayCity(city) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = city;
}

function getTemperature(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperatureResponse = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperatureResponse;
}

//Bonus
let button = document.querySelector("#current-location-button");
button.addEventListener("click", retrievePosition);

function retrievePosition(event) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherInCurrentPosition);
}

function showWeatherInCurrentPosition(response) {
  displayCity(response.data.name);
  showTemperature(response);
}

retrievePosition();
