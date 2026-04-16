import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: ({ search, page }) =>
        `?apikey=${API_KEY}&s=${search}&page=${page}`,
    }),

    getMovieDetails: builder.query({
      query: (id) => `?apikey=${API_KEY}&i=${id}`,
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
} = omdbApi;