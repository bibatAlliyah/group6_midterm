import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "../services/omdbApi";
import movieReducer from "../features/movieSlice";

export const store = configureStore({
  reducer: {
    [omdbApi.reducerPath]: omdbApi.reducer,
    movies: movieReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});