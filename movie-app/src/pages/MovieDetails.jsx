import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../services/omdbApi";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";
import placeholder from "../assets/placeholder.png";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetMovieDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading movie</p>;

  const rtRating = data.Ratings?.find(
    (r) => r.Source === "Rotten Tomatoes"
  );

  const imdbRating = data.Ratings?.find(
    (r) => r.Source === "Internet Movie Database"
  );

  return (
    <div className="details-page">

      <div className="details-container">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ◀ Back
        </button>

        {/* LEFT SIDE */}
        <div className="details-left">

          <h1 className="details-title">{data.Title}</h1>

          {/* RATINGS */}
          <div className="ratings">
            <p><strong>IMDB:</strong> {imdbRating?.Value || "N/A"}</p>
            <p><strong>Rotten Tomatoes:</strong> {rtRating?.Value || "N/A"}</p>
          </div>

          <p className="movie-plot">{data.Plot}</p>

          <p><strong>Cast:</strong> {data.Actors}</p>

          {/* INFO GRID */}
          <div className="movie-info-grid">
            <p><strong>Year:</strong> {data.Year}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>Runtime:</strong> {data.Runtime}</p>
            <p><strong>Language:</strong> {data.Language}</p>
            <p><strong>Country:</strong> {data.Country}</p>
            <p><strong>Director:</strong> {data.Director}</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="details-right">

          <img
            src={
              data.Poster !== "N/A"
                ? data.Poster
                : placeholder
            }
            alt={data.Title}
            width="100%"
            onError={(e) => {
              e.target.src = placeholder;
            }}
          />

          {/* ACTION BUTTONS */}
          <div className="details-actions">

            <button
              onClick={() => {
                dispatch(addBookmark(data));
              }}
            >
              ⭐ Bookmark
            </button>

            <button onClick={() => {
              dispatch(addWatchLater(data))
              }}
            >
              ⏰ Watch Later
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}