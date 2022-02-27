const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Favorite = require("./favorite");
const AccountSchema = new Schema({
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
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
