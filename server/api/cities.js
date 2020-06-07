var express = require("express");
var Cities = require("../models/cities");

var router = express.Router();

router.get("/", (req, res) => {
  Cities.retrieveAll((err, cities) => {
    if (err) return res.json(err);
    return res.json(cities);
  });
});

router.post("/", (req, res) => {
  console.log("Backend reveived " + req.body.city);
  Cities.insert(req.body.city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
