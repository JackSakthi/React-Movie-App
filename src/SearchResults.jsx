import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './search.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedMovie(null); // Reset selection when new search is made
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for: "{query}"</h2>

      <div className="search-container">
        <div className="movies-grid">
          {results.length > 0 ? results.map(movie => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : '/no-image.jpg'
                }
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
              <p>{movie.release_date?.slice(0, 4) || 'N/A'}</p>
            </div>
          )) : <p>No results found.</p>}
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
    </div>
  );
};

export default SearchResults;
