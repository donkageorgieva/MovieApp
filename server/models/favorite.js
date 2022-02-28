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
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

FavoriteSchema.methods.addNote = function (comment) {
  const currNotes = [...this.notes];
  const note = new Note({
    comment,
    favoriteId: this._id,
  });
  note.save();
  currNotes.push(note);
  this.notes = currNotes;
  return this.save();
};
const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
