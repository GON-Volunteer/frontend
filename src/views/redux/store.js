import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // 다른 리듀서들도 추가해주세요, 필요에 따라
  },
});

export default store;
