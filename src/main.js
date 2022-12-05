const searchButton = document.getElementById("search");
searchButton.onclick = geocodingApi;

const cityNameInput = document.getElementById("cityName");

cityNameInput.addEventListener("keydown", (event) => {
  console.log(event)
  if (event.key === "Enter") {
    geocodingApi();
    event.preventDefault();
  }
});

async function geocodingApi() {
  let latitud = 0;
  let longitud = 0;
  let place = "";

  const city = cityNameInput.value;
const API_KEY = '125f79c4bbc76005bd37ada5db7e73ee';

  const GEOCODING = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  const response = await fetch(GEOCODING);
  const data = await response.json();
  console.log(data);
  latitud = data[0].lat;
  longitud = data[0].lon;
  place = data[0].name;

  currentWeather(latitud, longitud, place, API_KEY);
  weatherDay(latitud, longitud, place, API_KEY);
}

async function currentWeather(lat, lon, place, API_KEY) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);

  const currentWeather = document.getElementById("currentWeather");
  const div = document.createElement("div");
  div.className = "currentWeatherDiv";
  const cityName = document.createElement("h2");
  const iconWeather = document.createElement("img");
  const date = document.createElement("p");
  const now = new Date();
  const temperatura = document.createElement("p");
  temperatura.className = "currentWeather-temperatura";
  const description = document.createElement("p");
  description.className = "description";
  const iconWeatherContainer = document.createElement("div");
  iconWeatherContainer.className = "iconWeatherContainer";

  date.innerHTML = `${now.getUTCDate()}-${
    now.getMonth() + 1
  }/${now.getFullYear()}`;
  date.className = "date";

  cityName.innerHTML = `${place}, ${data.sys.country}`;
  iconWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconWeather.className = "iconWeather";
  temperatura.innerHTML = `${data.main.temp.toFixed(0)}°C`;
  description.innerHTML = data.weather[0].description;

  iconWeatherContainer.append(iconWeather, description);
  div.append(cityName, date, temperatura, iconWeatherContainer);
  currentWeather.append(div);
}

async function weatherDay(lat, lon, place, API_KEY) {
  const URL_MONTH = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${API_KEY}&units=metric`;
  const response = await fetch(URL_MONTH);
  const data = await response.json();
  console.log(data);

  const section = document.getElementById("weatherHour");
  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  const titulo = document.createElement("h3");
  titulo.className = "tituloCity";
  titulo.innerHTML = place;
  cardContainer.appendChild(titulo);

  data.list.forEach((element) => {
    const card = document.createElement("div");
    card.className = "weatherHour-container";

    const iconHourly = document.createElement("img");
    const h3Hour = document.createElement("h3");
    h3Hour.className = "hora";
    const descriptionHour = document.createElement("p");
    descriptionHour.className = "description-hour";
    const temperaturaHourly = document.createElement("p");
    temperaturaHourly.className = "tempHour";

    iconHourly.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
    h3Hour.innerHTML = element.dt_txt;
    descriptionHour.innerHTML = element.weather[0].description;
    temperaturaHourly.innerHTML = `${element.main.temp.toFixed(0)}°C`;

    card.append(h3Hour, temperaturaHourly, iconHourly, descriptionHour);
    cardContainer.appendChild(card);
  });
  section.appendChild(cardContainer);
}

const span = document.querySelector("span");
const date = new Date();
span.innerHTML = date.getFullYear();
