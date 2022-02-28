import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log("logging in", action.payload.token);
      state.token = action.payload.token;
    },
  },
});

export const userActions = userSlice.actions;
