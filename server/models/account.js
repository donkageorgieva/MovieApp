const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Favorite = require("./favorite");
const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

AccountSchema.methods.getUser = function (userId, movie) {
  this.populate({
    path: "users",
    match: {
      _id: userId,
    },
  })
    .then((populatedUser) => {
      if (populatedUser.users[0].favorites.length > 0) {
        populatedUser.users[0].populate("favorites").then((currUser) => {
          console.log(currUser);
          const movieExists = currUser.favorites.find((favMovie) => {
            return favMovie.movieId.trim() === movie.movieId.trim();
          });
          if (movieExists) {
            console.log(movieExists);
            const err = new Error("Movie already exists");
            err.statusCode = 422;
            throw err;
          }
        });
      }
      const favorite = new Favorite(movie);
      favorite.save();

      const newFavorites = [...populatedUser.users[0].favorites];

      newFavorites.push(favorite);

      populatedUser.users[0].favorites = newFavorites;
      populatedUser.users[0].save();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
  return this.save();
};
const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
