import { useMediaQuery } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    success: "",
    token: "",
    code: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.success = action.payload.success;
      state.token = action.payload.token;
      state.code = action.payload.code;
    },

    clearUser: (state) => {
      state.token = "";
      state.success = "";
    },
  },
});
//export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const loginInfo = userSlice.actions;
