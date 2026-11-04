import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/titles/favorite/')
      .then((response) => {
        setMovies(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  return (
    <div className="favorites-container">
      <h1>Movies you like</h1>
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || movie.imdbId || index} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
