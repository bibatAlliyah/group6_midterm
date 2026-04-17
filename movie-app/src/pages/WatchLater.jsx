import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeWatchLater } from "../features/movieSlice";

export default function WatchLater() {
  const dispatch = useDispatch();
  const watchLater = useSelector((state) => state.movies.watchLater);

  return (
    <div>
      <h1>Watch Later</h1>

      {watchLater.length === 0 && <p>No movies saved</p>}

      {watchLater.map((movie) => (
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
            onClick={() => dispatch(removeWatchLater(movie.imdbID))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}