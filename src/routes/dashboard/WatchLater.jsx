import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';

export default function WatchLater() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/titles/watchlater/')
      .then((response) => {
        setMovies(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching watch later movies:', error);
      });
  }, []);

  return (
    <div className="watchlater-container">
      <h1>Movies to watch later</h1>
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || movie.imdbId || index} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
