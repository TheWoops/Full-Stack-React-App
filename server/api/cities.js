var express = require("express");
var Cities = require("../models/cities");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("Hello");
  Cities.retrieveAll((err, cities) => {
    if (err) return res.json(err);
    return res.json(cities);
  });
});

router.post("/", (req, res) => {
  Cities.insert(req.body.city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
