import React, { useEffect, useState } from "react";
import "./BestFrom2025.css";

const BestFrom2025 = () => {
  const [movies, setMovies] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?primary_release_year=2025&sort_by=popularity.desc&api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a`
        );
        const data = await res.json();

        if (data.results) {
          setMovies(isMobile ? data.results.slice(0, 10) : data.results);
        } else {
          setError('Failed to load movies.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Something went wrong.');
      }
    };

    fetchMovies();
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="best-from-2025">
      <h2>🔥 Best from 2025</h2>

      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => handleCardClick(movie)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Movie Details */}
      {selectedMovie && (
        <div className="movie-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>×</button>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            <h3>{selectedMovie.title}</h3>
            <p><strong>Release:</strong> {selectedMovie.release_date}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
            <p>{selectedMovie?.overview? selectedMovie.overview.length < 50? selectedMovie.overview: selectedMovie.overview.slice(0, 50) + "...": "No description available."}</p>

            <a
              href={`https://www.youtube.com/results?search_query=${selectedMovie.title}+trailer`}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-btn"
            >
              🎬 Watch Trailer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestFrom2025;
