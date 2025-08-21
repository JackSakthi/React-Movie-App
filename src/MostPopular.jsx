import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./MostPopular.css";

const MostPopular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a&language=en-US&page=2"
        );
        const data = await response.json();

        if (data.results && Array.isArray(data.results)) {
          const topThree = data.results.slice(0, 3).map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.jpg",
          }));
          setPopularMovies(topThree);
        } else {
          setError("Invalid data format from TMDB API.");
        }
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
        setError("Something went wrong while fetching movies.");
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="most-popular-section">
      <h2>🔥 Most Popular</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        popularMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`popular-row ${index % 2 !== 0 ? "reverse" : ""}`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>
                {movie.overview.length > 180
                  ? movie.overview.slice(0, 180) + "..."
                  : movie.overview}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MostPopular;
