require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const favoritesRouter = require("./routes/favorites");
const authRouter = require("./routes/auth");
const auth = require("./middleware/auth");

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
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization, Content-Type"],
  })
);

app.use("/auth", authRouter);
app.use("/", auth.userAuth, favoritesRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
