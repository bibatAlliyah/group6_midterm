import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeBookmark } from "../features/movieSlice";

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.movies.bookmarks);

  return (
    <div>
      <h1>Bookmarks</h1>

      {bookmarks.length === 0 && <p>No bookmarks yet</p>}

      {bookmarks.map((movie) => (
        <div key={movie.imdbID} style={{ marginBottom: "15px" }}>
          <Link to={`/movie/${movie.imdbID}`}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/100"
              }
              alt={movie.Title}
              width="100"
            />
          </Link>

          <div>{movie.Title}</div>

          <button
            onClick={() => dispatch(removeBookmark(movie.imdbID))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}