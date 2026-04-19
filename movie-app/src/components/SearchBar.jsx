import "./SearchBar.css";

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  size = "normal"
}) {
  return (
    <div className={`search-container ${size}`}>
      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />

      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}