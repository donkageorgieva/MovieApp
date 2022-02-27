const Account = require("../models/account");
const User = require("../models/user");
const mongoose = require("mongoose");
exports.addFavorite = (req, res) => {
  Account.findById(req.accountId)
    .then((acc) => {
      acc.addFavorite(req.body.userId, {
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

exports.getOneFavorite = (req, res) => {};
exports.getFavorites = (req, res) => {
  let favorites;
  Account.findById(req.accountId)
    .then((acc) => {
      acc
        .populate({
          path: "users",
          match: {
            _id: req.userId,
          },
        })
        .then((populatedacc) => {
          populatedacc.users[0].populate("favorites").then((user) => {
            favorites = [...user.favorites];
            res.send(favorites);
          });
        });
    })
    .catch((err) => {
      err.statusCode = 404;
      throw err;
    });
};
