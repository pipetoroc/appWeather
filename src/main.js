const searchButton = document.getElementById("search");
searchButton.onclick = geocodingApi;

async function geocodingApi() {
  let latitud = 0;
  let longitud = 0;
  let place = '';
  const cityName = document.getElementById("cityName");
  const city = cityName.value;
  const GEOCODING = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=125f79c4bbc76005bd37ada5db7e73ee`;

  const response = await fetch(GEOCODING);
  const data = await response.json();
  console.log(data);
  latitud = data[0].lat;
  longitud = data[0].lon;
  place = data[0].name;

  currentWeather(latitud, longitud, place);
}

async function currentWeather(lat, lon, place) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=125f79c4bbc76005bd37ada5db7e73ee&units=metric`;
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);

  const currentWeather = document.getElementById("currentWeather");
  const card = document.createElement('article');
  const div = document.createElement('div');
  const cityName = document.createElement("h2");
  const iconWeather = document.createElement('img');
  const temperatura = document.createElement("p");
  const feelsLike = document.createElement("p");

  card.className = 'card';
  iconWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  cityName.innerHTML = `${place}, ${data.sys.country}`;

  temperatura.innerHTML = `Temperatura: ${data.main.temp}°C`;
  feelsLike.innerHTML = `Sensacion de: ${data.main.feels_like}°C`;


  div.append(iconWeather, cityName);
  card.append(div, temperatura, feelsLike);

  currentWeather.appendChild(card);
  
}
