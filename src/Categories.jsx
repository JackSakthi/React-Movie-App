import React, { useEffect, useState } from "react";
import "./Categories.css";

const CategoriesPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "48ccd41a4f0bbf8b9ab6e64d2499fc2a";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        setError("Failed to fetch genres.");
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  const fetchMovies = async (genreId) => {
    setLoading(true);
    setError("");
    setSelectedGenreId(genreId);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("Failed to fetch movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="categories-page">
      <aside className="sidebar">
        <h3>🎭 Genres</h3>
        {genres.length === 0 && <p>Loading genres...</p>}
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-btn ${selectedGenreId === genre.id ? "active" : ""}`}
            onClick={() => fetchMovies(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </aside>

      <main className="movies-content">
        <h2>
          {selectedGenreId
            ? `🎬 Movies in "${genres.find((g) => g.id === selectedGenreId)?.name}"`
            : "📂 Select a Genre"}
        </h2>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="loading">Loading movies...</p>
        ) : movies.length === 0 && selectedGenreId ? (
          <p className="no-results">No movies found for this genre.</p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
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

      {selectedMovie && (
        <div className="movie-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "/no-image.jpg"
              }
              alt={selectedMovie.title}
            />
            <h3>{selectedMovie.title}</h3>
            <p><strong>Release Year:</strong> {selectedMovie.release_date?.slice(0, 4)}</p>
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
