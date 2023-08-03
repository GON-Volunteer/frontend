import { useMediaQuery } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    accountinfo: "",
    username: "",
    success: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.accountinfo = action.payload.accountinfo;
      state.username = action.payload.username;
      state.success = action.payload.success;
    },

    clearUser: (state) => {
      state.id = "";
      state.accountinfo = "";
      state.username = "";
      state.success = "";
    },
  },
});

//export const { loginUser, clearUser } = userSlice.actions;
// export const { loginUser } = userSlice.actions;
export const selectId = (state) => state.user.id;
export const selectAc = (state) => state.user.accountinfo;
export const selectname = (state) => state.user.username;
export const selectSuccess = (state) => state.user.success;

export const searchAction = userSlice.actions;
export const searchReducer = userSlice.reducer;
export default userSlice;
