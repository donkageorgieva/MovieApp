const User = require("../models/user");

exports.demoUser = (req, res, next) => {
  console.log(req.body.userId, "Id sent");
  const userId = !req.body.userId
    ? "6218f4ae266e18613232840e"
    : req.body.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        console.log("not user");
        const err = new Error("Demo user not found");
        err.statusCode = 404;
        throw err;
      }

      req.user = user;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        throw err;
      }
    });
};
