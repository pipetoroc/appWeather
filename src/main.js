const searchButton = document.getElementById("search");
searchButton.onclick = geocodingApi;

  async function geocodingApi() {
  let latitud = 0;
  let longitud = 0;
  let place = "";
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
  weatherMonth(latitud, longitud);
}

async function currentWeather(lat, lon, place) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=125f79c4bbc76005bd37ada5db7e73ee&units=metric`;
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);

  const currentWeather = document.getElementById("currentWeather");
  const div = document.createElement("div");
  div.className = 'currentWeatherDiv';
  const cityName = document.createElement("h2");
  const iconWeather = document.createElement("img");
  const date = document.createElement('p');
  const now = new Date();
  const temperatura = document.createElement('p');
  temperatura.className = 'currentWeather-temperatura';
  const description = document.createElement('p');
  description.className = 'description';

  date.innerHTML = `${now.getUTCDate()}-${now.getMonth()+1}/${now.getFullYear()}`
  date.className = 'date';

  cityName.innerHTML = `${place}, ${data.sys.country}`;
  iconWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconWeather.className = 'iconWeather';
  temperatura.innerHTML = `${(data.main.temp).toFixed(0)}°C`;
  description.innerHTML = data.weather[0].description;

  div.append(cityName, date, temperatura, iconWeather, description);
  currentWeather.append(div);
}

async function weatherMonth (lat, lon) {
  const URL_MONTH = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=125f79c4bbc76005bd37ada5db7e73ee&units=metric`;
  const response = await fetch(URL_MONTH);
  const data = await response.json();
  console.log(data)

  const section = document.getElementById('weatherHour');

  data.list.forEach(element => {

    const card = document.createElement('div');
    card.className = 'weatherMonth-container';
    const iconHourly = document.createElement('img');
    const h3Hour = document.createElement('h3');
    h3Hour.className = 'hora';
    const descriptionHour = document.createElement('p');
    descriptionHour.className = 'description-hour';
    const temperaturaHourly = document.createElement('p');
    temperaturaHourly.className = 'tempHour';

    iconHourly.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
    h3Hour.innerHTML = element.dt_txt;
    descriptionHour.innerHTML = element.weather[0].description;
    temperaturaHourly.innerHTML = `${(element.main.temp).toFixed(0)}°C`;

    card.append(h3Hour,temperaturaHourly, iconHourly, descriptionHour );

    section.appendChild(card);
  });
}
