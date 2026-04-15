import { useState } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";

export default function MovieSearch() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useSearchMoviesQuery(
    {search, page},
    {skip: search === ""}
  );

  const movies = data?.Search || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie App</h1>

      {/*SEARCH BAR*/}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />

      <button
        onClick={() => {
          if (!query.trim()) return;
          setSearch(query);
          setPage(1);
        }}
    >
      Search
    </button>

      {/* LOADING */}
      {isLoading && <p>Loading...</p>}

      {/* ERROR */}
      {isError && <p>Error fetching movies</p>}

      {/* MOVIE LIST */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ width: "150px" }}>
            <img src={movie.Poster} width="100%" />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}