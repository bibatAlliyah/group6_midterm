import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

export default function Bookmarks() {
  const bookmarks = useSelector((state) => state.movies.bookmarks);

  return (
    <div>
      <h1>Bookmarks</h1>

      {bookmarks.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}