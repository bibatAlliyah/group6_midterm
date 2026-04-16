import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

export default function WatchLater() {
  const list = useSelector((state) => state.movies.watchLater);

  return (
    <div>
      <h1>Watch Later</h1>

      {list.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}