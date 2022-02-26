const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Account = require("../models/account");
const mongoose = require("mongoose");
const User = require("../models/user");
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
      const accountUsers = [];
      const user = new User({
        name: username,
      });
      user.save();
      accountUsers.push(user._id);
      const account = new Account({
        username,
        password: hashedPassword,
        email,
        users: accountUsers,
      });

      return account.save();
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
  const accountname = req.account.username;
  const password = req.account.password;
  const accountId = req.account.accountId;
  console.log(accountId, "id");
  Account.findById(accountId)
    .then((account) => {
      console.log(account, accountname, "names");
      if (!account || account.username.trim() !== accountname.trim()) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }

      const isAuth = bcrypt.compare(password, account.password);

      return {
        isAuth,
        userId: account._id,
      };
    })
    .then((authInfo) => {
      if (!authInfo.isAuth) {
        const err = new Error("Invalid password");
        err.statusCode = 401;
        throw err;
      }

      res.status(200).json({
        message: "Logged in",
        accountId: authInfo.userId,
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
