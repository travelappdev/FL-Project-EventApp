'use strict';

function injectWeather(city) {

  var script = document.createElement('script');
  script.setAttribute("src", `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')&format=json&callback=callbackFunction`);
  document.body.appendChild(script);
}


let weather_img = {
  lightning : [3,4,23],
  cloudy    : [20,21,22,25,26,27,28,29,30,44,42],
  snow      : [5,13,15,16,41,43,7,46],
  sunny     : [32,36,34],
  rainy     : [0,1,2,6,8,9,18,35]
}
