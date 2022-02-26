const Account = require("../models/account");

exports.demoAccount = (req, res, next) => {
  if (!req.body.accountId && req.body.demo) {
    console.log("finding by id");
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
