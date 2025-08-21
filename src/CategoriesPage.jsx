import React, { useState } from 'react';
import './CategoriesPage.css';

const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Crime: 80,
  'Sci-Fi': 878,
  Thriller: 53,
  Animation: 16,
};

const CategoriesPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  // Track selected movie
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMoviesByGenre = async (genreName) => {
    const genreId = genreMap[genreName];
    if (!genreId) return;

    setLoading(true);
    setSelectedGenre(genreName);
    setError('');
    setMovies([]);
    setSelectedMovie(null);  // Reset selected movie on new genre

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a`
      );
      const data = await res.json();

      if (data.results && Array.isArray(data.results)) {
        const formatted = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date?.slice(0, 4) || 'N/A',
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-image.jpg',
          overview: movie.overview || 'No description available',
          rating: movie.vote_average || 'N/A',
          trailerKey: null,  // We'll fetch this later if needed
        }));
        setMovies(formatted);
      } else {
        setError('No movies found for this category.');
      }
    } catch (err) {
      console.error('Error fetching genre movies:', err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  // Optional: fetch trailer key for YouTube embed
  const fetchTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Find first YouTube trailer
        const trailer = data.results.find(
          (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
        );
        return trailer ? trailer.key : null;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Handle selecting a movie, fetch trailer key too
  const handleSelectMovie = async (movie) => {
    const trailerKey = await fetchTrailer(movie.id);
    setSelectedMovie({ ...movie, trailerKey });
  };

  return (
    <div className="categories-page">
      <h2>🎬 Browse by Categories</h2>

      <div className="genre-buttons">
        {Object.keys(genreMap).map((genre) => (
          <button
            key={genre}
            onClick={() => fetchMoviesByGenre(genre)}
            className={selectedGenre === genre ? 'active' : ''}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Loading movies...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="main-content">
          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
                onClick={() => handleSelectMovie(movie)}
              >
                <img src={movie.poster} alt={movie.title} />
                <h4>{movie.title}</h4>
                <p>{movie.year}</p>
              </div>
            ))}
          </div>

          {selectedMovie && (
            <div className="movie-details">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="detail-poster" />
              <h3>{selectedMovie.title} ({selectedMovie.year})</h3>
              <p><strong>Rating:</strong> {selectedMovie.rating} ⭐</p>
              <p className="overview">{selectedMovie.overview}</p>
              {selectedMovie.trailerKey ? (
                <div className="trailer-container">
                  <iframe
                    title="Trailer"
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>No trailer available</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
