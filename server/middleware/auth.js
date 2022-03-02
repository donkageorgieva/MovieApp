const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.userAuth = (req, res, next) => {
  if (!req.get("Authorization")) {
    const error = new Error("Authorization  is required");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const err = new Error("User not authenticated");
    err.statusCode = 401;
    throw err;
  }

  req.userId = decodedToken.userId.toString();

  next();
};
exports.demoUser = (req, res, next) => {
  if (!req.body.userId && req.body.demo) {
    User.findById("621c83a2eb4c9c895ce7591d")
      .then((user) => {
        if (!user) {
          const err = new Error("Demo user not found");
          err.statusCode = 404;
          throw err;
        }

        req.user = {
          username: user.username,
          password: process.env.DEMOPASS,
          userId: user._id,
        };
        next();
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
          throw err;
        }
      });
  } else {
    req.user = {
      username: req.body.username,
      password: req.body.password,
      userId: req.body.userId,
    };
    next();
  }
};
