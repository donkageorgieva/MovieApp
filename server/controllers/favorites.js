const Account = require("../models/account");
const User = require("../models/user");
const mongoose = require("mongoose");
exports.addFavorite = (req, res) => {
  Account.findById(req.accountId)
    .then((acc) => {
      acc.getUser(req.body.userId, {
        movieId: req.body.movieId,
        name: req.body.movieName,
        genres: [...req.body.genres],
      });
    })
    .catch((err) => {
      err.statusCode = 404;
      throw err;
    });
};

exports.getFavorites = (req, res) => {};
