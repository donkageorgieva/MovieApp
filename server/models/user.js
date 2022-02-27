const mongoose = require("mongoose");
const Favorite = require("./favorite");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
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
  const currFavorites = [...this.favorites];
  let updatedFavorites;
  let movieToDelete;
  if (this.favorites.length <= 0) {
    const err = new Error("Favorites list is empty");
    err.statusCode = 404;
    throw err;
  }

  this.populate("favorites")
    .then((populatedUser) => {
      // console.log(populatedUser.favorites, "popuser");
      // console.log(populatedUser);
      updatedFavorites = populatedUser.favorites.filter((fav) => {
        return fav.movieId.trim("") !== movieId.trim("");
      });
      return Favorite.findOneAndDelete({
        movieId: movieId,
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
