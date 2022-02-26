const mongoose = require("mongoose");
const { Schema } = mongoose;
const Favorite = require("../models/favorites");
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
  favorites: {
    type: Schema.Types.ObjectId,
    ref: "Favorite",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
