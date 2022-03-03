const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = require("./user");
const RatingSchema = new Schema({
  value: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
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

RatingSchema.methods.changeValue = function (value) {
  const newValue = parseInt(value.value);
  this.value = newValue;
  return this.save();
};

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
