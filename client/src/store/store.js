import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user";
import { favSlice } from "./favorites/favorites";
import { movieSlice } from "./movies/movies";
import { detailSlice } from "./details/details";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    favorites: favSlice.reducer,
    movies: movieSlice.reducer,
    details: detailSlice.reducer,
  },
});

export default store;
