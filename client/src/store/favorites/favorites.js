import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favSlice = createSlice({
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
    setFavorites(state, actions) {
      const favorites = actions.payload.favorites;
      state.favorites = favorites;
      console.log(favorites, "setting favs");
    },
  },
});

export const favActions = favSlice.actions;
