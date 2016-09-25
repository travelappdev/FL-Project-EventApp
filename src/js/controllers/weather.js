'use strict';

function injectWeather(city) {

  var script = document.createElement('script');
  script.setAttribute("src", `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')&format=json&callback=callbackFunction`);
  document.body.appendChild(script);
}
