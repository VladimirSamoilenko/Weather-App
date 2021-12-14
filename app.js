"use strict";
window.addEventListener("load", () => {
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1fe9372e4a0637ced9ffb713e2dfd7b8`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temp = data.main.temp;
          const desc = data.weather[0].main;
          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.trunc(temp - 273);
          temperatureDescription.textContent = desc;
          locationTimezone.textContent = data.name;
          //Init Icon
          setIcons(desc, document.querySelector(".icon"));
        });
    });
  }

  //Set icon
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/ /g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
