import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeBookmark } from "../features/movieSlice";
import "./Bookmarks.css";
import placeholder from "../assets/placeholder.png";

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.movies.bookmarks);

  return (
    <div className="bookmarks-page">

      <h1 className="bookmarks-title">⭐ Your Bookmarks</h1>

      {bookmarks.length === 0 && (
        <p className="empty-text">No bookmarks yet</p>
      )}

      <div className="bookmarks-grid">
        {bookmarks.map((movie) => (
          <div key={movie.imdbID} className="bookmark-card">

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

            <div className="bookmark-info">
              <p className="bookmark-title">{movie.Title}</p>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeBookmark(movie.imdbID))}
              >
                🗑️ Remove
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}