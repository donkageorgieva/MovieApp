import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, actions) {
      console.log("setting movies", actions.payload.movies);
      state.movies = actions.payload.movies;
    },
  },
});

export const moviesActions = movieSlice.actions;
