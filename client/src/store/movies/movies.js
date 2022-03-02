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
    addMovie(state, actions) {
      const exists = state.movies.find((movie) => {
        return movie.id.toString().trim() === actions.payload.movie.id.trim();
      });
      if (exists) {
        return;
      }
      state.movies.push(actions.payload.movie);
    },
  },
});

export const moviesActions = movieSlice.actions;
