const mongoose = require("mongoose");
const Favorite = require("./favorite");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
