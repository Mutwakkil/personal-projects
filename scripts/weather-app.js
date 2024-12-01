const apiKey =  "9c8772ebd7b6fe7a6ed7e1d6ca8a394a";
const dropList =  document.querySelector('.js-dropdown');
let query = '', cityName;


async function getCity() {
  let lat, lon;
  query = document.querySelector('.js-location-input').value;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  const response = await fetch(url);
  const cities = await response.json();
  cities.forEach((city) => {
    lat = city.lat;
    lon = city.lon;
    cityName = city.name;
  });
  getWeather(lon, lat);
}

document.querySelector('.js-search-button').addEventListener('click', () => {
  getCity();
  document.querySelector('.js-location-input').value = '';
});

async function getWeather(lon, lat) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const weather = await response.json();
  console.log(weather)
  let temp, description;

    temp = weather.main.temp;
    description = weather.weather[0].description;
  document.querySelector('.js-dropdown'). innerHTML= `
  City Name: ${cityName},
  Temperature: ${temp},
  Weather description: ${description}
  `;
}