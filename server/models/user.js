const mongoose = require("mongoose");
const Favorite = require("./favorite");
const Note = require("./notes");
const { Schema } = mongoose;

const UserSchema = new Schema({
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
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
      required: true,
    },
  ],
});

UserSchema.methods.addFavorite = function (movie) {
  if (this.favorites.length > 0) {
    this.populate("favorites").then((currUser) => {
      const movieExists = currUser.favorites.find((favMovie) => {
        return favMovie.movieId.trim() === movie.movieId.trim();
      });
      if (movieExists) {
        const err = new Error("Movie already exists");
        err.statusCode = 422;
        throw err;
      }
    });
  }
  const favorite = new Favorite(movie);
  favorite.save();

  const newFavorites = [...this.favorites];

  newFavorites.push(favorite);

  this.favorites = newFavorites;
  return this.save();
};

UserSchema.methods.deleteOneFavorite = function (movieId) {
  let updatedFavorites;

  if (this.favorites.length <= 0) {
    const err = new Error("Favorites list is empty");
    err.statusCode = 404;
    throw err;
  }

  this.populate("favorites")
    .then((populatedUser) => {
      updatedFavorites = populatedUser.favorites.filter((fav) => {
        return fav.movieId.trim("") !== movieId.trim("");
      });

      return Favorite.findOne({ movieId: movieId })
        .then((favorite) => {
          Note.deleteMany({ favoriteId: favorite._id }).then(() => {
            return Favorite.findOneAndDelete({ _id: favorite._id });
          });
        })

        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
          }
        });
    })
    .then((result) => {
      this.favorites = updatedFavorites;
      return this.save();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        throw err;
      }
    });
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
