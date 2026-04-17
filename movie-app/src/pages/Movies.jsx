import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [params] = useSearchParams();

  const search = params.get("q") || "marvel";

  const [page, setPage] = useState(1);

  // API filters
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  // client-side filter
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setPage(1);
  }, [search, year, type]);

  const { data, isLoading, isError } = useSearchMoviesQuery({
    search,
    page,
    year,
    type,
  });

  // SORT movies
  const movies = (data?.Search || [])
    .slice()
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.Title.localeCompare(b.Title)
        : b.Title.localeCompare(a.Title)
    );

  const totalResults = Number(data?.totalResults || 0);
  const totalPages = Math.ceil(totalResults / 10);

  // pagination window (10 pages at a time)
  const start = Math.floor((page - 1) / 10) * 10 + 1;
  const end = Math.min(start + 9, totalPages);

  return (
    <div>
      <h2>Results for: {search}</h2>

      {/* FILTER BAR */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

        {/* YEAR DROPDOWN */}
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          {Array.from({ length: 30 }, (_, i) => {
            const y = 2026 - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>

        {/* TYPE FILTER */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        {/* SORT */}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
        </select>

        {/* CLEAR FILTERS */}
        <button
          onClick={() => {
            setYear("");
            setType("");
            setSortOrder("asc");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* STATES */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {!isLoading && movies.length === 0 && (
        <p>No movies found</p>
      )}

      {/* MOVIE LIST */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {/* PREV */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* PAGE NUMBERS (10 AT A TIME) */}
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const pageNum = start + i;

          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              style={{
                fontWeight: pageNum === page ? "bold" : "normal",
                textDecoration: pageNum === page ? "underline" : "none",
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>

        {/* PAGE INDICATOR */}
        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Page {page} of {totalPages || 1}
        </span>
      </div>
    </div>
  );
}