const User = require("../models/user");

exports.addNote = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("user not found");
        err.statusCode = 404;
        throw err;
      }

      user.addNote({
        comment: req.body.comment,
        movieId: req.params.movieId,
      });
      res.status(200).json({
        data: {
          comment: req.body.comment,
          movieId: req.params.movieId,
        },
      });
    })

    .catch((err) => {
      throw err;
    });
};
exports.getNotes = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      user.populate("notes").then((populatedUserNotes) => {
        res.status(200).json({
          data: populatedUserNotes.notes,
        });
      });
    })
    .catch((err) => {
      throw err;
    });
};
