const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!!!!");
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
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err;
    });
};
exports.login = (req, res) => {
  const username = req.user.username;
  const password = req.user.password;
  const userId = req.user.userId;

  User.findById(userId)

    .then((user) => {
      if (!user || user.username.trim() !== username.trim()) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      return bcrypt.compare(password, user.password);
    })
    .then((authInfo) => {
      if (!authInfo) {
        const err = new Error("Invalid password");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        {
          userId,
        },
        process.env.SECRET,
        { expiresIn: "30d" }
      );
      res.status(200).json({
        message: "Logged in",
        userId: authInfo.userId,
        token,
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
