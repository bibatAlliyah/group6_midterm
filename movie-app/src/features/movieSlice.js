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
      const exists = state.bookmarks.find(
        (m) => m.imdbID === action.payload.imdbID
      );

      if (!exists) {
        state.bookmarks.push(action.payload);
      }
    },

    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (m) => m.imdbID !== action.payload
      );
    },

    addWatchLater: (state, action) => {
      const exists = state.watchLater.find(
        (m) => m.imdbID === action.payload.imdbID
      );

      if (!exists) {
        state.watchLater.push(action.payload);
      }
    },

    removeWatchLater: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (m) => m.imdbID !== action.payload
      );
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  addWatchLater,
  removeWatchLater,
} = movieSlice.actions;

export default movieSlice.reducer;