import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, actions) {
      const movie = actions.payload.movie;
      if (
        state.favorites.find(
          (fav) => fav.movieId.trim() === movie.movieId.trim()
        )
      ) {
        return;
      }
      state.favorites.push(actions.payload.movie);
    },
    removeFavorite(state, actions) {
      const movie = actions.payload.movie;
      if (
        !state.favorites.find(
          (fav) => fav.movieId.trim() === movie.movieId.trim()
        )
      ) {
        return;
      }
      state.favorites = state.favorites.filter(
        (fav) => fav.movieId.trim() !== movie.movieId.trim()
      );
    },
  },
});

export const userActions = favoritesSlice.actions;
