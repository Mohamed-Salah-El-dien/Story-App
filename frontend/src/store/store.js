import { configureStore } from "@reduxjs/toolkit";
import storySlice from "./storySlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    story: storySlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
