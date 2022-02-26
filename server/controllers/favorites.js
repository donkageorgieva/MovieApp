const User = require("../models/user");
const Favorite = require("../models/favorites");
exports.addFavorite = (req, res) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("Invalid user id");
        err.statusCode = 404;
        throw err;
      }

      return Favorite.addFavorite(req.body.movieId, user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
