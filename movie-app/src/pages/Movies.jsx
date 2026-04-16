import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [params] = useSearchParams();

  //can't show all movies cuz the API only shows search-based results
  const search = params.get("q") || "marvel";

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading } = useSearchMoviesQuery({
    search,
    page,
  });

  const movies = (data?.Search || [])
    .slice()
    .sort((a, b) => a.Title.localeCompare(b.Title));

  return (
    <div>
      <h2>Results for: {search}</h2>

      {isLoading && <p>Loading...</p>}

      {!isLoading && movies.length === 0 && (
        <p>No movies found</p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      <div>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}