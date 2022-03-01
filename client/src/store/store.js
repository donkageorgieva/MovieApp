import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user";
import { favSlice } from "./favorites/favorites";
import { movieSlice } from "./movies/movies";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    favorites: favSlice.reducer,
    movies: movieSlice.reducer,
  },
});

export default store;
