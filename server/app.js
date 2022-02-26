require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const favoritesRouter = require("./routes/favorites");
const notesRouter = require("./routes/notes");
const ratingsRouter = require("./routes/ratings");
const authRouter = require("./routes/auth");

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.PASSWORD}@movie-app-api.eq8yx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then()
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw err;
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("*", cors());

app.use("/auth", authRouter);
app.use("/favorites", favoritesRouter);
app.use("/ratings", ratingsRouter);
app.use("/notes", notesRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
