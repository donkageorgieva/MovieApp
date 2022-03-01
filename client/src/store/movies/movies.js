import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [
    {
      name: "",
      genres: [""],
      image: "",
      summary: "",
      url: "",
    },
  ],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, actions) {
      const movies = actions.payload.movies;
      state.movies = movies.map((movie) => {
        const newMovie = {};
        newMovie.name = movie.show.name;
        newMovie.genres = [...movie.show.genres];
        newMovie.image = movie.show.image;
        newMovie.summary = movie.show.summary;
        newMovie.url = movie.show.url;
        return newMovie;
      });
    },
  },
});

export const moviesActions = movieSlice.actions;
