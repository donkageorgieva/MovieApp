const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavSchema = new Schema({
  favorites: [
    {
      movieId: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

FavSchema.methods.addMovie = function (movieId, user) {
  const updatedFavorites = [...this.favorites];
  updatedFavorites.push(movieId);
  this.favorites = updatedFavorites;
  return this.save();
};
const Favorite = mongoose.model("Favorite", FavSchema);
module.exports = Favorite;
