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
    })

    .catch((err) => {
      throw err;
    });
};
