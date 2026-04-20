import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!query.trim()) return;

    const safeQuery = encodeURIComponent(
      query.replace(/[^a-zA-Z0-9 ]/g, "")
    );

    navigate(`/movies?q=${safeQuery}`);
  };

  return (
    <div className="home">
      <div className="hero">
        <img src="/logo.png" alt="logo" className="home-logo" />
        <h1 style={{ fontFamily: "AliensAndCows" }}>
          ReelHub
        </h1>
      </div>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        size="normal"
      />

      <button
        className="browse-btn"
        onClick={() => navigate("/movies")}
      >
        Browse Movies ►
      </button>

      <div className="home-info">
        <h2>Discover Movies with ReelHub</h2>
        <p>
          ReelHub is your personal movie database hub designed for discovering, exploring,
          and organizing films and TV series. Inspired by platforms like IMDb, it focuses
          on helping you find great titles and keep track of what you want to watch—
          not streaming them.
        </p>

        <p>
          Browse a wide range of movies, view detailed information, and build your own
          watchlist all in one clean and simple interface. Whether you're searching for
          your next favorite film or saving titles for later, ReelHub makes it easy.
        </p>

        <div className="features">
          <div className="feature">
            <h3>🔍 Discover</h3>
            <p>Explore movies and TV series across different genres and categories.</p>
          </div>

          <div className="feature">
            <h3>📄 Details</h3>
            <p>View posters, summaries, and key information for every title.</p>
          </div>

          <div className="feature">
            <h3>⭐ Watchlist</h3>
            <p>Save titles and keep track of what you plan to watch next.</p>
          </div>
        </div>

        <p className="home-note">
          ReelHub helps you decide what to watch—not where to watch it.
        </p>
      </div>
    </div>
  );
}