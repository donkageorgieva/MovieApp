const Account = require("../models/account");

exports.demoAccount = (req, res, next) => {
  console.log("in demoUser");
  if (!req.body.userId && req.body.demo) {
    console.log("finding by id");
    Account.findById("621a1deb8564ad84c7870051")
      .then((user) => {
        console.log(user, "user");
        if (!user) {
          const err = new Error("Demo user not found");
          err.statusCode = 404;
          throw err;
        }

        req.user = {
          username: user.username,
          password: user.password,
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
