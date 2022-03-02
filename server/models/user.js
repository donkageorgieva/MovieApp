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
  let updatedFavorites = [...this.favorites];

  if (this.favorites.length <= 0) {
    const err = new Error("Favorites list is empty");
    err.statusCode = 404;
    throw err;
  }
  updatedFavorites = this.favorites.filter(
    (fav) => fav._id.toString().trim() !== movieId.toString().trim()
  );
  console.log(updatedFavorites, "updatedFavs");
  this.favorites = updatedFavorites;
  return this.save();
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
