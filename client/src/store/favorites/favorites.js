import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [
    {
      movieId: "",
      name: "",
      summary: "",
      image: "",
      genres: [],
    },
  ],
};

export const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, actions) {
      const doesExist = state.favorites.find((fav) => {
        return fav.movieId.trim() === actions.payload.favorite.movieId.trim();
      });
      if (doesExist) {
        return;
      }
      state.favorites.push(actions.payload.favorite);
    },
    removeFavorite(state, actions) {
      console.log(actions.payload.favorite, "favorite remove");
      const doesExist = state.favorites.find((fav) => {
        return fav.movieId.trim() === actions.payload.favorite.trim();
      });
      if (!doesExist) {
        return;
      }
      state.favorites = state.favorites.filter((fav) => {
        return fav.movieId.trim() !== actions.payload.favorite.trim();
      });
    },
    setFavorites(state, actions) {
      const favorites = actions.payload.favorites;
      state.favorites = favorites;
      console.log(favorites, "setting favs");
    },
  },
});

export const favActions = favSlice.actions;
