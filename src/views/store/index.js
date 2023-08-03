import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
// import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  user: userSlice.reducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});
// const store = configureStore({
//   reducer: {
//     user: searchReducer.reducer,
//     // 다른 리듀서들도 추가해주세요, 필요에 따라
//   },
// });

export default store;
