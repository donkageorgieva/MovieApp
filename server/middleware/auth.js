const Account = require("../models/account");
const jwt = require("jsonwebtoken");
exports.accAuth = (req, res, next) => {
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

  req.accountId = decodedToken.accountId.toString();

  next();
};
exports.demoAcc = (req, res, next) => {
  if (!req.body.accountId && req.body.demo) {
    Account.findById("621a217f1e027a1dde165b4b")
      .then((account) => {
        if (!account) {
          const err = new Error("Demo account not found");
          err.statusCode = 404;
          throw err;
        }

        req.account = {
          username: account.username,
          password: account.password,
          accountId: account._id,
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
    req.account = {
      username: req.body.username,
      password: req.body.password,
      accountId: req.body.accountId,
    };
    next();
  }
};
