import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user";
import { favSlice } from "./favorites/favorites";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    favorites: favSlice.reducer,
  },
});

export default store;
