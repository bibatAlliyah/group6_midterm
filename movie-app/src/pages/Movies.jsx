import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import "./Movies.css";

export default function Movies() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [params] = useSearchParams();
  const search = params.get("q") || "movies";
  const handleSearch = () => {
    if (!query.trim()) return;

    const safeQuery = encodeURIComponent(
      query.replace(/[^a-zA-Z0-9 ]/g, "")
    );

    navigate(`/movies?q=${safeQuery}`);
  };
  

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
    <div className="movies-page">

      {/* TOP BAR */}
      <div className="movies-topbar">

        {/* SEARCH (CENTER) */}
        <div className="search-wrapper">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            size="small"
          />
        </div>

        {/* FILTERS (RIGHT) */}
        <div className="filters-wrapper">

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

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">A–Z</option>
            <option value="desc">Z–A</option>
          </select>

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
      </div>

      {/* TITLE */}
      <h2 className="results-title">Results for: {search}</h2>

      {/* STATES */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {!isLoading && movies.length === 0 && <p>No movies found</p>}

      {/* MOVIE GRID */}
      <div className="movies-grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        {Array.from({ length: end - start + 1 }, (_, i) => {
          const pageNum = start + i;

          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={pageNum === page ? "active-page" : ""}
            >
              {pageNum}
            </button>
          );
        })}

        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
          Next
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>
      </div>

    </div>
  );
}