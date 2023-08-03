import { useMediaQuery } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    success: "",
    auth: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.success = action.payload.success;
      state.auth = action.payload.auth;
    },

    clearUser: (state) => {
      state.id = "";
      state.username = "";
      state.success = "";
      state.auth = "";
    },
  },
});

//export const { loginUser, clearUser } = userSlice.actions;
// export const { loginUser } = userSlice.actions;
export const selectId = (state) => state.user.id;
export const selectname = (state) => state.user.username;
export const selectSuccess = (state) => state.user.success;
export const selectAuth = (state) => state.user.auth;

export const searchAction = userSlice.actions;
export const searchReducer = userSlice.reducer;
export default userSlice;
