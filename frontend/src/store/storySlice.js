import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: { data: null, story: {} },
  reducers: {
    setStories(state, action) {
      state.data = action.payload;
    },
    addStory(state, action) {
      state.data = [action.payload, ...state.data];
    },
    deleteStory(state, action) {
      state.data = state.data.filter(
        (story) => story._id !== action.payload._id
      );
    },
    setStory(state, action) {
      state.story = action.payload;
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice;
