const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const salt = 10;
  bcrypt
    .hash(password, salt)
    .then((hashedPassword) => {
      const user = new User({
        username,
        password: hashedPassword,
        email,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "New user created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err;
    });
};
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      return bcrypt.compare(password, user.password);
    })
    .then((isAuth) => {
      if (!isAuth) {
        const err = new Error("Invalid password");
        err.statusCode = 401;
        throw err;
      }

      res.status(200).json({
        message: "Logged in",
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
