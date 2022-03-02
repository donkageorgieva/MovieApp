const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const NoteSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
