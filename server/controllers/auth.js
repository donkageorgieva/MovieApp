const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Account = require("../models/account");
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
      res.status(201).json({ message: "Account created", userId: result._id });
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
  let userId;
  Account.findById(accountId)
    .then((account) => {
      if (!account || account.username.trim() !== accountname.trim()) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }
      userId = account._id;
      return bcrypt.compare(password.trim(), account.password.trim());
    })
    .then((authInfo) => {
      console.log(authInfo);
      if (!authInfo) {
        const err = new Error("Invalid password");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        {
          accountId: userId,
        },
        process.env.SECRET,
        { expiresIn: "30d" }
      );
      res.status(200).json({
        message: "Logged in",
        accountId: authInfo.userId,
        token,
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
