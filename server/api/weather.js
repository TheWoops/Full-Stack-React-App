var express = require("express");
var Weather = require("../models/weather");

var router = express.Router();

router.get("/:city", (req, res) => {
  console.log("Fetching City weather");
  var city = req.params.city;
  Weather.retrieveByCity(city, (err, weatherData) => {
    if (err) return res.json(err);
    return res.json(weatherData);
  });
});

module.exports = router;
