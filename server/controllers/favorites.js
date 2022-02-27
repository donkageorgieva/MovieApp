const Account = require("../models/account");
const User = require("../models/user");
const mongoose = require("mongoose");
exports.addFavorite = (req, res) => {
  Account.findById(req.accountId)
    .then((acc) => {
      if (!acc) {
        const err = new Error("Account not found");
        err.statusCode = 404;
        throw err;
      }
      acc
        .populate({
          path: "users",
          match: {
            _id: req.body.userId,
          },
        })
        .then((populatedUser) => {
          populatedUser.users[0].addFavorite({
            name: req.body.movieName,
            movieId: req.body.movieId,
            genres: [...req.body.genres],
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          throw err;
        });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
  res.sendStatus(200);
};

exports.getOneFavorite = (req, res) => {
  let favorite;
  Account.findById(req.accountId)
    .then((acc) => {
      if (!acc) {
        const err = new Error("Account not found");
        err.statusCode = 404;
        throw err;
      }
      acc
        .populate({
          path: "users",
          match: {
            _id: req.userId,
          },
        })
        .then((populatedacc) => {
          populatedacc.users[0]
            .populate({
              path: "favorites",
              match: {
                movieId: req.params.movieId,
              },
            })
            .then((user) => {
              if (user.favorites.length <= 0) {
                const err = new Error("Not found");
                err.statusCode = 404;
                throw err;
              }
              favorite = user.favorites[0];
              res.send(favorite);
            });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
exports.getFavorites = (req, res) => {
  let favorites;
  Account.findById(req.accountId)
    .then((acc) => {
      if (!acc) {
        const err = new Error("Account not found");
        err.statusCode = 404;
        throw err;
      }
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
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
exports.deleteOneFavorite = (req, res) => {
  Account.findById(req.accountId)
    .then((acc) => {
      if (!acc) {
        const err = new Error("Account not found");
        err.statusCode = 404;
        throw err;
      }
      acc
        .populate({
          path: "users",
          match: {
            _id: req.body.userId,
          },
        })
        .then((populatedUser) => {
          populatedUser.users[0].deleteOneFavorite(req.params.movieId);
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          throw err;
        });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
  res.sendStatus(200);
};
