import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeWatchLater } from "../features/movieSlice";
import "./WatchLater.css";

export default function WatchLater() {
  const dispatch = useDispatch();
  const watchLater = useSelector((state) => state.movies.watchLater);

  return (
    <div className="watchlater-page">

      <h1 className="watchlater-title">⏰ Watch Later</h1>

      {watchLater.length === 0 && (
        <p className="empty-text">No movies saved</p>
      )}

      <div className="watchlater-grid">
        {watchLater.map((movie) => (
          <div key={movie.imdbID} className="watchlater-card">

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

            <div className="watchlater-info">
              <p className="watchlater-title-text">{movie.Title}</p>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeWatchLater(movie.imdbID))}
              >
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}