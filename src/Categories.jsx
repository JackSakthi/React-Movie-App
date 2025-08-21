import React, { useEffect, useState } from "react";
import "./Categories.css";

const API_KEY = "48ccd41a4f0bbf8b9ab6e64d2499fc2a";

const CategoriesPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        setError("⚠️ Failed to fetch genres.");
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  // ✅ Fetch movies by genre
  const fetchMovies = async (genre) => {
    setLoading(true);
    setError("");
    setSelectedGenre(genre);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("⚠️ Failed to fetch movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categories-page">
      {/* ✅ Flex container for sidebar + movies */}
      <div className="layout-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>🎭 Genres</h3>
          {genres.length === 0 && <p>Loading genres...</p>}
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`genre-btn ${selectedGenre?.id === genre.id ? "active" : ""}`}
              onClick={() => fetchMovies(genre)}
            >
              {genre.name}
            </button>
          ))}
        </aside>

        {/* Movies Content */}
        <main className="movies-content">
          <h2>
            {selectedGenre
              ? `🎬 Movies in "${selectedGenre.name}"`
              : "📂 Select a Genre"}
          </h2>

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p className="loading">⏳ Loading movies...</p>
          ) : movies.length === 0 && selectedGenre ? (
            <p className="no-results">No movies found for this genre.</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-image.jpg"
                    }
                    alt={movie.title}
                  />
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date?.slice(0, 4)}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <div className="movie-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>
              &times;
            </button>
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "/no-image.jpg"
              }
              alt={selectedMovie.title}
            />
            <h3>{selectedMovie.title}</h3>
            <p>
              <strong>Release Year:</strong>{" "}
              {selectedMovie.release_date?.slice(0, 4)}
            </p>
            <p className="desc">
              {selectedMovie.overview?.split(" ").slice(0, 50).join(" ")}...
            </p>
            <a
              className="trailer-btn"
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                selectedMovie.title + " trailer"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶️ Watch Trailer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
