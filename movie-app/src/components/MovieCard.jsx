import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  return (
    <div className="movie-card">

      {/* POSTER */}
      <div className="poster-wrapper">

        <Link to={`/movie/${movie.imdbID}`}>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.Title}
          />
        </Link>

        {/* TOP RIGHT ACTIONS */}
        <div className="card-actions">
          <button onClick={() => dispatch(addBookmark(movie))}>
            ⭐
          </button>

          <button onClick={() => dispatch(addWatchLater(movie))}>
            ⏰
          </button>
        </div>
      </div>

      {/* TITLE */}
      <div className="movie-title">
        {movie.Title}
      </div>

    </div>
  );
}