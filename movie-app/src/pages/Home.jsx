import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to MovieApp 🎬</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => {
          if (!query.trim()) return;
          navigate(`/movies?q=${query}`);
        }}
      />
    </div>
  );
}