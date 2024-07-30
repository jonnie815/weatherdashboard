
document.getElementById('search-btn').addEventListener('click', fetchWeather);

function fetchWeather() {
  const city = document.getElementById('search-bar').value;
  const apiKey = '3580ff44e3df151735630b221d5dc31b';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
      displayOverview(data);
    })
    .catch(error => alert("City not found"));
}

function displayCurrentWeather(data) {
  document.getElementById('city-name').textContent = `${data.name}`;
  document.getElementById('country').textContent = `${data.sys.country}`;
  document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
  document.getElementById('description').textContent = `${data.weather[0].description}`;
  document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function displayForecast(data) {
  const forecastList = document.getElementById('forecast-list');
  forecastList.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');

    const date = new Date(data.list[i].dt_txt).toLocaleDateString();
    const temp = `${data.list[i].main.temp}°C`;
    const description = data.list[i].weather[0].description;
    const iconUrl = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;

    forecastItem.innerHTML = `
      <p>${date}</p>
      <img src="${iconUrl}" alt="${description}">
      <p>${temp}</p>
      <p>${description}</p>
    `;

    forecastList.appendChild(forecastItem);
  }
}

function displayOverview(data) {
  const current = data.list[0];
  document.getElementById('wind-speed').textContent = `${current.wind.speed} km/h`;
  document.getElementById('wind-direction').textContent = `${current.wind.deg}°`;
  document.getElementById('uv-index').textContent = `5.50 uv`; // UV index is not available in this API call
  document.getElementById('sunrise').textContent = new Date(data.city.sunrise * 1000).toLocaleTimeString();
  document.getElementById('sunset').textContent = new Date(data.city.sunset * 1000).toLocaleTimeString();
  document.getElementById('humidity').textContent = `${current.main.humidity}%`;
  document.getElementById('visibility').textContent = `${current.visibility / 1000} km`;
  document.getElementById('feels-like').textContent = `${current.main.feels_like}°C`;
}
