import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";
import noPoster from "../assets/no-poster.png";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const hasPoster =
    movie.Poster &&
    movie.Poster !== "N/A" &&
    movie.Poster !== "undefined";

  return (
    <div className="movie-card">

      {/* POSTER */}
      <div className="poster-wrapper">

        <Link to={`/movie/${movie.imdbID}`}>
          <img
            src={hasPoster ? movie.Poster : noPoster}
            alt={movie.Title}
            onError={(e) => {
              e.target.src = noPoster;
            }}
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