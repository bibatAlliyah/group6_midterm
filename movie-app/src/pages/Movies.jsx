import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [params] = useSearchParams();
  const search = params.get("q") || "";

  const [page, setPage] = useState(1);

  const { data, isLoading } = useSearchMoviesQuery(
    { search, page },
    { skip: !search }
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