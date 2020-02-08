window.addEventListener('load', () => {
  let long;
  let lat;
  const tempDesc = document.querySelector('.temp--desc');
  const tempDegree = document.querySelector('.temp--degree');
  const locationTimezone = document.querySelector('.location--timezone');
  const tempSection = document.querySelector('.temp--container');
  const tempScale = document.querySelector('.temp--scale');
  const tempBtn = document.querySelector('.temp-btn');

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
          const { temperature, summary, icon } = data.currently;
          const timezone = data.timezone.replace(/_/g, ' ');

          locationTimezone.textContent = timezone;
          tempDesc.textContent = summary;
          tempDegree.textContent = Math.round(temperature);
          let celcius = (temperature - 32) * (5 / 9);

          //   setIcons(icon, document.querySelector('.icon'));

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

  //  function setIcons(icon, iconID) {
  //     const skycons = new Skycons({ color: 'white' });
  //     const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  //     skycons.play();
  //     return skycons.set(iconID, Skycons[currentIcon]);
  //   }
});

const iconElement = document.querySelector('.icon');
function displayIcon() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
}
