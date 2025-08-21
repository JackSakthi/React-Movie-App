import React, { useEffect, useState } from 'react';
import './BestFrom2025Page.css';

const BestFrom2025Page = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = '48ccd41a4f0bbf8b9ab6e64d2499fc2a';

  const fetchBestFrom2025 = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?primary_release_year=2025&sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        setError('Failed to fetch valid movie data.');
      }
    } catch (err) {
      console.error('Error fetching Best from 2025:', err);
      setError('Something went wrong while fetching movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestFrom2025();
  }, []);

  return (
    <div className="best2025-page">
      <h2>🎬 Best Movies from 2025</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="best2025-container">
          <div className="best2025-grid">
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
                      : '/no-image.jpg'
                  }
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
                <p>{movie.release_date?.slice(0, 4)}</p>
              </div>
            ))}
          </div>

          {selectedMovie && (
            <div className="movie-details">
              <img
                src={
                  selectedMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                    : '/no-image.jpg'
                }
                alt={selectedMovie.title}
              />
              <div className="details-content">
                <h3>{selectedMovie.title}</h3>
                <p><strong>Year:</strong> {selectedMovie.release_date?.slice(0, 4)}</p>
                <p><strong>Rating:</strong> ⭐ {selectedMovie.vote_average || 'N/A'}</p>
                <p>{selectedMovie.overview || 'No description available.'}</p>
                <a
                  href={`https://www.youtube.com/results?search_query=${selectedMovie.title} trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-btn"
                >
                  ▶️ Watch Trailer
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BestFrom2025Page;
