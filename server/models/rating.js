const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RatingSchema = new Schema({
  value: {
    type: Number,
    min: 0,
    max: 5,
  },
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
