import { useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../services/omdbApi";

export default function MovieDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetMovieDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.Title}</h1>
      <img src={data.Poster} />

      <p>{data.Plot}</p>

      <h3>Ratings:</h3>
      {data.Ratings?.map((r) => (
        <p key={r.Source}>
          {r.Source}: {r.Value}
        </p>
      ))}
    </div>
  );
}