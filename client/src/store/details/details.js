import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {
    name: "",
    movieId: "",
    notes: [{ _id: "", comment: "", movieId: "" }],
    rating: {
      movieId: "",
      value: 0,
      _id: "",
    },
  },
};

export const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    display(state, actions) {
      state.movie = {
        ...actions.payload.movie,
      };
    },
    comment(state, actions) {
      state.movie.notes.push({
        ...actions.payload.movie,
      });
    },
    deleteNote(state, actions) {
      state.movie.notes = state.movie.notes.filter((note) => {
        if (note._id.trim() !== actions.payload.note._id.trim()) {
          return {
            ...note,
          };
        }
      });
      console.log(actions.payload, "removing");
    },
    setNotes(state, actions) {
      state.movie.notes = actions.payload.notes.data.map((note) => {
        return {
          ...note,
        };
      });
    },
    setRating(state, actions) {
      console.log("set");
      if (actions.payload.notes.data.length > 0) {
        state.rating = {
          value: parseInt(actions.payload.notes.data[0].value),
          ...actions.payload.notes.data[0],
        };
      } else {
        state.rating = {
          ...state.rating.movieId,
          value: 0,
          ...state.rating._id,
        };
      }
    },
    addRating(state, actions) {
      console.log("add", actions.payload.notes.data[0]);

      state.rating = {
        ...actions.payload.notes.data[0],
      };
    },
  },
});

export const detailsActions = detailSlice.actions;
