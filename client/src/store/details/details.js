import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {
    name: "",
    movieId: "",
    notes: [],
    rating: 0,
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
    removeNote(state, actions) {
      console.log(actions.payload);
    },
    setNotes(state, actions) {
      console.log(actions.payload.notes, "NOTES payload");
      // state.movie.notes = actions.payload.notes;
      state.movie.notes = actions.payload.notes.data.map((note) => {
        return {
          ...note,
        };
      });
    },
  },
});

export const detailsActions = detailSlice.actions;
