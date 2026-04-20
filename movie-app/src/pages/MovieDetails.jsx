import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../services/omdbApi";
import { useDispatch } from "react-redux";
import { addBookmark, addWatchLater } from "../features/movieSlice";
import noPoster from "../assets/no-poster.png";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetMovieDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading movie</p>;

  const hasPoster =
    data.Poster &&
    data.Poster !== "N/A" &&
    data.Poster !== "undefined";

  const rtRating = data.Ratings?.find(
    (r) => r.Source === "Rotten Tomatoes"
  );

  const imdbRating = data.Ratings?.find(
    (r) => r.Source === "Internet Movie Database"
  );

  return (
    <div style={{ padding: "20px" }}>

      <h1>{data.Title}</h1>

      <img
        src={hasPoster ? data.Poster : noPoster}
        alt={data.Title}
        onError={(e) => {
          e.target.src = noPoster;
        }}
        width="200"
      />

      <p><strong>Year:</strong> {data.Year}</p>
      <p><strong>Genre:</strong> {data.Genre}</p>
      <p><strong>Runtime:</strong> {data.Runtime}</p>
      <p><strong>Language:</strong> {data.Language}</p>
      <p><strong>Country:</strong> {data.Country}</p>
      <p><strong>Director:</strong> {data.Director}</p>
      <p><strong>Actors:</strong> {data.Actors}</p>

      <p>{data.Plot}</p>

      <h3>Ratings</h3>

      <p>
        <strong>IMDB:</strong>{" "}
        {imdbRating ? imdbRating.Value : "N/A"}
      </p>

      <p>
        <strong>Rotten Tomatoes:</strong>{" "}
        {rtRating ? rtRating.Value : "N/A"}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>

        <button onClick={() => dispatch(addBookmark(data))}>
          ⭐ Bookmark
        </button>

        <button onClick={() => dispatch(addWatchLater(data))}>
          ⏰ Watch Later
        </button>

        <button onClick={() => navigate(-1)}>
          ⬅ Go Back
        </button>

      </div>
    </div>
  );
}