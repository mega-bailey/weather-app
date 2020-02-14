window.addEventListener('load', () => {
  let long;
  let lat;
  const tempDesc = document.querySelector('.temp--desc');
  const tempDegree = document.querySelector('.temp--degree');
  const locationTimezone = document.querySelector('.location--timezone');
  const tempScale = document.querySelector('.temp--scale');
  const tempBtn = document.querySelector('.temp-btn');
  const feelsLike = document.querySelector('.temp--apparent-temp');
  const mainIcon = document.querySelector('.main-icon');
  const sunrise = document.querySelector('.main-details--sunriseTime');
  const sunset = document.querySelector('.main-details--sunsetTime');
  const uvIndexData = document.querySelector('.uv-index-data');
  const windData = document.querySelector('.wind-data');
  const pressureData = document.querySelector('.pressure-data');
  const humidityData = document.querySelector('.humidity-data');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/c3e551f48e3c56baf9fb50a8ae8d2444/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            apparentTemperature,
            icon,
            uvIndex,
            windSpeed,
            pressure,
            humidity
          } = data.currently;
          const weekday = new Date().getDay();
          const { sunriseTime, sunsetTime } = data.daily.data[weekday];

          uvIndexData.textContent = uvIndex;
          windData.textContent = windSpeed;
          pressureData.textContent = pressure;
          humidityData.textContent = humidity;

          const sunriseDate = new Date(sunriseTime * 1000);
          const sunsetDate = new Date(sunsetTime * 1000);
          const sunriseHours = sunriseDate.getHours();
          const sunsetHours = sunsetDate.getHours() - 12;
          const sunriseMinutes = sunriseDate.getMinutes();
          const sunsetMinutes = sunsetDate.getMinutes();
          const formattedSunrise = `${sunriseHours}:${sunriseMinutes} AM`;
          const formattedSunset = `${sunsetHours}:${sunsetMinutes} PM`;
          console.log(formattedSunrise, formattedSunset);

          sunrise.textContent = formattedSunrise;
          sunset.textContent = formattedSunset;

          const timezone = data.timezone
            .replace(/\//g, ', ')
            .replace(/_/g, ' ');

          mainIcon.innerHTML = `<img src="icons/${icon}.svg"/>`;
          locationTimezone.textContent = timezone;
          tempDesc.textContent = summary;
          feelsLike.textContent = Math.round(apparentTemperature);
          tempDegree.textContent = Math.round(temperature);
          let celcius = (temperature - 32) * (5 / 9);

          tempBtn.addEventListener('click', () => {
            if (tempScale.textContent === '˚F') {
              tempScale.textContent = '˚C';
              tempDegree.textContent = Math.round(celcius);
            } else {
              tempScale.textContent = '˚F';
              tempDegree.textContent = Math.round(temperature);
            }
          });
        });
    });
  } else {
    h1.textContent = 'Your browser is not allowing geolocation access';
  }
});

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const numDay = new Date().getDate();
const month = new Date().getMonth();
const monthDay = new Date().getDay();
const year = new Date().getFullYear();
const currentMonth = months[month];
const weekday = days[monthDay];

const currentDay = document.querySelector('.main-details--day');
const currentDate = document.querySelector('.main-details--date');
const currentTime = document.querySelector('.main-details--time');

currentDay.innerHTML = `${weekday}`;
currentDate.innerHTML = `${currentMonth} ${numDay}, ${year}`;

//TIME
var time = setInterval(getTime, 1000);
function getTime() {
  var date = new Date();
  currentTime.innerHTML = date.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
}
