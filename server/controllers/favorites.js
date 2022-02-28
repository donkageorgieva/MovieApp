const mongoose = require("mongoose");
const User = require("../models/user");
exports.addFavorite = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }
      user;

      user
        .addFavorite({
          name: req.body.name,
          movieId: req.body.movieId,
          genres: [...req.body.genres],
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
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user
        .populate({
          path: "favorites",
          match: {
            movieId: req.params.movieId,
          },
        })
        .then((populatedUser) => {
          if (populatedUser.favorites.length <= 0) {
            const err = new Error("Not found");
            err.statusCode = 404;
            throw err;
          }
          favorite = populatedUser.favorites[0];
          res.send(favorite);
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
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user.populate("favorites").then((populatedUser) => {
        favorites = [...populatedUser.favorites];
        res.send(favorites);
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
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user.deleteOneFavorite(req.params.movieId);
    })
    .then((result) => {
      res.sendStatus(200);
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
exports.addNote = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user
        .populate({
          path: "favorites",
          match: {
            movieId: req.params.movieId,
          },
        })
        .then((populated) => {
          if (!populated.favorites[0]) {
            const err = new Error("Not found");
            err.statusCode = 404;
            throw err;
          }
          populated.favorites[0].addNote(req.body.comment);
        })
        .then(res.sendStatus(200));
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
exports.getNotes = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user
        .populate({
          path: "favorites",

          match: {
            movieId: req.params.movieId,
          },
        })
        .then((populatedUser) => {
          populatedUser.favorites[0].populate("notes").then((populatedfav) => {
            res.send(populatedfav.notes);
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
};
exports.addRating = (req, res) => {
  console.log("adding rating");
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user
        .populate({
          path: "favorites",

          match: {
            movieId: req.params.movieId,
          },
        })
        .then((populatedUser) => {
          populatedUser.favorites[0].addRating(req.body.amount);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
exports.getRatings = (req, res) => {
  console.log("getting ratings");
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user.populate("favorites").then((populatedUser) => {
        res.send({
          movie: populatedUser.favorites[0].movieId,
          rating: populatedUser.favorites[0].rating,
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
