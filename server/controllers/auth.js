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
exports.login = (req, res) => {};
