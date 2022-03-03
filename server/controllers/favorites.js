const mongoose = require("mongoose");
const Favorite = require("../models/favorite");
const Note = require("../models/notes");
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
      const movie = {
        name: req.body.name,
        movieId: req.body.movieId,
        genres: [...req.body.genres],
        image: req.body.image,
      };
      user.addFavorite(movie);
      res.status(200).json({
        message: "Success",
        data: {
          name: req.body.name,
          movieId: req.body.movieId,
          genres: [...req.body.genres],
          image: req.body.image,
        },
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};

exports.getOneFavorite = (req, res) => {
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
          let favorite = populatedUser.favorites[0];
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
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user.populate("favorites").then((populatedUser) => {
        let favorites = [...populatedUser.favorites];
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

      Favorite.findOneAndDelete({ movieId: req.params.movieId }).then(
        (result) => {
          Note.deleteMany({ favoriteId: req.params.movieId });

          user.deleteOneFavorite(result._id);
        }
      );
    })
    .then((result) => {
      res.status(200).json({
        data: req.params.movieId,
      });
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
