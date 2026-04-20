import { Link } from "react-router-dom";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <div><img src="/logo.png" alt="logo" className="logo" /></div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Browse</NavLink>
        <NavLink to="/bookmarks">Bookmarks</NavLink>
        <NavLink to="/watch-later">Watch Later</NavLink>
      </div>
    </div>
  );
}