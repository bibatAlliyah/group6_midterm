import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Bookmarks from "./pages/Bookmarks";
import WatchLater from "./pages/WatchLater";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/watch-later" element={<WatchLater />} />
      </Routes>
    </Router>
  );
}