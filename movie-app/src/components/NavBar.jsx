import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <h2>MovieApp</h2>

      <Link to="/">Home</Link>
      <Link to="/movies">Browse</Link>
      <Link to="/bookmarks">Bookmarks</Link>
      <Link to="/watch-later">Watch Later</Link>
    </nav>
  );
}