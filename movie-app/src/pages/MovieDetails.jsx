import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../services/omdbApi";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";

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
    <div style={{ padding: "20px" }}>
      
      {/* TITLE */}
      <h1>{data.Title}</h1>

      {/* POSTER */}
      <img
        src={
          data.Poster !== "N/A"
            ? data.Poster
            : "https://via.placeholder.com/200"
        }
        alt={data.Title}
        width="200"
      />

      {/* BASIC INFO */}
      <p><strong>Year:</strong> {data.Year}</p>
      <p><strong>Genre:</strong> {data.Genre}</p>
      <p><strong>Runtime:</strong> {data.Runtime}</p>
      <p><strong>Language:</strong> {data.Language}</p>
      <p><strong>Country:</strong> {data.Country}</p>
      <p><strong>Director:</strong> {data.Director}</p>
      <p><strong>Actors:</strong> {data.Actors}</p>

      {/* PLOT */}
      <p style={{ marginTop: "10px" }}>
        {data.Plot}
      </p>

      {/* RATINGS */}
      <h3>Ratings</h3>

      <div>
        <p>
          <strong>IMDB:</strong>{" "}
          {imdbRating ? imdbRating.Value : "N/A"}
        </p>

        <p>
          <strong>Rotten Tomatoes:</strong>{" "}
          {rtRating ? rtRating.Value : "N/A"}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        
        <button
          onClick={() => dispatch(addBookmark(data))}
        >
          ⭐ Bookmark
        </button>

        <button
          onClick={() => dispatch(addWatchLater(data))}
        >
          ⏰ Watch Later
        </button>

        <button onClick={() => navigate(-1)}>
          ⬅ Go Back
        </button>
      </div>
    </div>
  );
}