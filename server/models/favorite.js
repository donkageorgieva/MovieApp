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
  image: {
    type: String,
  },
  genres: [
    {
      type: String,
    },
  ],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
