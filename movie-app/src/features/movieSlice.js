import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  watchLater: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    addWatchLater: (state, action) => {
      state.watchLater.push(action.payload);
    },
  },
});

export const { addBookmark, addWatchLater } = movieSlice.actions;
export default movieSlice.reducer;