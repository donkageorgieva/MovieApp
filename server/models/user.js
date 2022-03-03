const mongoose = require("mongoose");
const Favorite = require("./favorite");
const Note = require("./notes");
const Rating = require("./rating");
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
  Ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rating",
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

UserSchema.methods.addNote = function (movie) {
  const currRatings = [...this.Ratings];
  const note = new Note({
    comment: movie.comment,
    movieId: movie.movieId,
    userId: this._id,
  });
  note.save();
  currRatings.push(note);
  this.Ratings = currRatings;
  this.save();
  return note._id;
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
UserSchema.methods.deleteOneNote = function (id) {
  let updatedRatings = [...this.Ratings];
  updatedRatings = this.Ratings.filter(
    (note) => note._id.toString().trim() !== id.toString().trim()
  );
  this.Ratings = updatedRatings;
  this.save();
  return this.Ratings;
};

UserSchema.methods.addRating = function (data) {
  const currRatings = [...this.ratings];
  Rating.findOne({ movieId: data.movieId.trim() })
    .then((foundRating) => {
      if (foundRating) {
        return foundRating.changeValue({
          value: data.value,
        });
      } else {
        const rating = new Rating({
          value: data.value,
          movieId: data.movieId,
          userId: this._id,
        });
        console.log(rating, "rating");
        rating.save();
        currRatings.push(rating);
        this.ratings = currRatings;
        return this.save();
      }
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    });
};
UserSchema.methods.deleteOneRating = function (id) {
  let updatedRatings = [...this.ratings];
  updatedRatings = this.ratings.filter(
    (rate) => rate._id.toString().trim() !== id.toString().trim()
  );
  this.ratings = updatedRatings;
  this.save();
  return this.ratings;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
