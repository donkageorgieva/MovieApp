import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload.token);
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const userActions = userSlice.actions;
