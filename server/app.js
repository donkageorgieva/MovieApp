var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// mongoose
//   .connect(
//     `mongodb+srv://admin:${process.env.PASSWORD}@movie-app-api.eq8yx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//   )
//   .then(console.log("connected to DB"))
//   .catch((err) => {
//     console.log(err);
//   });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
