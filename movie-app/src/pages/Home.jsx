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
        <img src="/logo.png" alt="logo" className="logo" />
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
    </div>
  );
}