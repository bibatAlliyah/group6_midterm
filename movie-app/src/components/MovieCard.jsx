import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";
import "./MovieCard.css";
import placeholder from "../assets/placeholder.png";

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
                : placeholder
            }
            alt={movie.Title}
            width="100%"
            onError={(e) => {
              e.target.src = placeholder;
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
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
      </div>

    </div>
  );
}