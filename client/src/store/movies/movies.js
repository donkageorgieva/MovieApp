import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, actions) {
      state.movies = actions.payload.movies;
    },
  },
});

export const moviesActions = movieSlice.actions;
