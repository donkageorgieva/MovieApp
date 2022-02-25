require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.PASSWORD}@movie-app-api.eq8yx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(console.log("connected to DB"))
  .catch((err) => {});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
