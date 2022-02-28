const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const NoteSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  favoriteId: {
    type: Schema.Types.ObjectId,
    ref: "Favorite",
  },
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
