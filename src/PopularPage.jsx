import React, { useEffect, useState } from 'react';
import './PopularPage.css';
import Footer from './Footer';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a&language=en-US&page=1'
      );
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        setError('Invalid response from API.');
      }
    } catch (err) {
      console.error('Failed to fetch popular movies:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="popular-page">
      <h2>🔥 Most Popular Movies</h2>

      {loading ? (
        <p className="loading">Loading movies...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="popular-container">
          <div className="popular-grid">
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
                <p>{movie.release_date?.slice(0, 4) || 'N/A'}</p>
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
      <Footer />
    </div>
  );
};

export default PopularPage;
