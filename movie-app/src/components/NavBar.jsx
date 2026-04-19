import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">MovieApp</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Browse</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/watch-later">Watch Later</Link>
      </div>
    </div>
  );
}