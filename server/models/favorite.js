const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
