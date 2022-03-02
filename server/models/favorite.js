const mongoose = require("mongoose");
const { Schema } = mongoose;
const Note = require("./notes");
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
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

FavoriteSchema.methods.addRating = function (amount) {
  this.rating = amount;
  return this.save();
};

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
