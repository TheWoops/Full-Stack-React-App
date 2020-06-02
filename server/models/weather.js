const request = require("request-promise");

const API_KEY = "e0147350fe40ba904b3ff805837128f9";

class Weather {
  static retrieveByCity(city, callback) {
    request({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      json: true,
    })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        console.log(err);
        callback({ error: "Could not reach OpenWeatherMap API!" });
      });
  }
}

module.exports = Weather;
