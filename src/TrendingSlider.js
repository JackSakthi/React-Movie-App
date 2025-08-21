import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingSlider.css";

const TrendingSlider = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a"
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          overview: movie.overview,
          releaseDate: movie.release_date,
          rating: movie.vote_average,
        }));
        setMovies(results);
      });
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="trending-slider">
      <h2>🔥 Trending Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div
            className="movie-slide"
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="img">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <p>{movie.title}</p>
          </div>
        ))}
      </Slider>

      {selectedMovie && (
        <div className="movie-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>
              &times;
            </button>
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div className="text">
              <h3>{selectedMovie.title}</h3>
              <p><strong>Release:</strong> {selectedMovie.releaseDate}</p>
              <p><strong>Rating:</strong> ⭐ {selectedMovie.rating}</p>
              <p className="desc">{selectedMovie.overview.split(' ').slice(0, 50).join(' ')}{selectedMovie.overview.split(' ').length > 50 && '...'}</p>
              <a
                href={`https://www.youtube.com/results?search_query=${selectedMovie.title}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                ▶ Watch Trailer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingSlider;
