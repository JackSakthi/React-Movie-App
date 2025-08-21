import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Home.css";

const HomeCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=48ccd41a4f0bbf8b9ab6e64d2499fc2a")
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 5))); // Top 5 movies
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <div className="home-carousel">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-slide">
            <div
              className="carousel-bg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="overlay">
                <div className="slide-content">
                  <h1>{movie.title}</h1>
                  <p>
                    {movie.overview.length > 150
                      ? movie.overview.slice(0, 150) + "..."
                      : movie.overview}
                  </p>
                  <button>Explore Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarousel;
