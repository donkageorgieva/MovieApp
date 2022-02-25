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

const Favorite = mongoose.Model("Favorite", FavSchema);
module.exports = Favorite;
