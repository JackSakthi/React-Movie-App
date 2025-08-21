import React, { useEffect, useState } from 'react';
import './TrendingPage.css';

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = '48ccd41a4f0bbf8b9ab6e64d2499fc2a';

  const fetchTrending = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(pageNum < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError('Failed to fetch trending movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="trending-page">
      <h2>🔥 Trending Movies</h2>

      {error && <p className="error">{error}</p>}

      <div className="trending-container">
        <div className="trending-grid">
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

      {loading && <p>Loading...</p>}

      {!loading && hasMore && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default TrendingPage;
