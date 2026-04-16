import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

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
    <div>
      <h1>Welcome to MovieApp 🎬</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
    </div>
  );
}