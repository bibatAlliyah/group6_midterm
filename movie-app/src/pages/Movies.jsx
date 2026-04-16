import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import { useEffect } from "react";

export default function Movies() {
  const [params] = useSearchParams();
  const search = params.get("q") || "";

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const shouldSkip = !search || search.trim() === "";

  const { data, isLoading } = useSearchMoviesQuery(
    { search, page },
    { skip: shouldSkip }
  );

  const movies = data?.Search || [];

  return (
    <div>
      <h2>Results for: {search}</h2>

      {isLoading && <p>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      <button onClick={() => setPage((p) => p - 1)}>Prev</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}