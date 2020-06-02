const path = require("path"); //
const express = require("express"); // express is the backend server framework
const bodyParser = require("body-parser"); // for http communication

var db = require("./database");

const ENV = process.env.NODE_ENV; // dev, test or prod; this information is provided by the node environment
const PORT = process.env.PORT || 5000;

const app = express(); // this is the basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/cities", require("./api/cities"));
app.use("/api/weather", require("./api/weather"));

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT); // express listens on a port on the server
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(err.error);
  console.log(`PostgrSQL connected: ${res[0].now}`);
});

module.exports = app;
