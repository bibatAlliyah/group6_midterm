import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  return (
    <div style={{ width: "150px" }}>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} width="100%" />
      </Link>

      <p>{movie.Title}</p>

      <button onClick={() => dispatch(addBookmark(movie))}>
        ⭐ Bookmark
      </button>

      <button onClick={() => dispatch(addWatchLater(movie))}>
        ⏰ Watch Later
      </button>
    </div>
  );
}