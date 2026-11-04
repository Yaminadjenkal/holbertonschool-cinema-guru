import { useState, useEffect } from 'react';
import axios from 'axios';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    axios
      .get('/api/titles/favorite/')
      .then((res) => {
        const favs = res.data || [];
        if (favs.some((item) => item.imdbId === movie.imdbId)) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.error(err));

    axios
      .get('/api/titles/watchlater/')
      .then((res) => {
        const watch = res.data || [];
        if (watch.some((item) => item.imdbId === movie.imdbId)) {
          setIsWatchLater(true);
        }
      })
      .catch((err) => console.error(err));
  }, [movie.imdbId]);

  const handleClick = (type) => {
    const route = `/api/titles/${type}/${movie.imdbId}`;

    if (type === 'favorite') {
      if (isFavorite) {
        axios
          .delete(route)
          .then(() => setIsFavorite(false))
          .catch((err) => console.error(err));
      } else {
        axios
          .post(route)
          .then(() => setIsFavorite(true))
          .catch((err) => console.error(err));
      }
    } else if (type === 'watchlater') {
      if (isWatchLater) {
        axios
          .delete(route)
          .then(() => setIsWatchLater(false))
          .catch((err) => console.error(err));
      } else {
        axios
          .post(route)
          .then(() => setIsWatchLater(true))
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-card-icons">
        <FontAwesomeIcon
          icon={faHeart}
          className={`icon ${isFavorite ? 'active' : ''}`}
          onClick={() => handleClick('favorite')}
        />
        <FontAwesomeIcon
          icon={faClock}
          className={`icon ${isWatchLater ? 'active' : ''}`}
          onClick={() => handleClick('watchlater')}
        />
      </div>
      <h3>{movie?.title}</h3>
      <p>{movie?.synopsis}</p>
      <ul className="tags-list">
        {movie?.genres?.map((genre, idx) => (
          <li key={idx} className="tag-item">
            {genre}
          </li>
        ))}
      </ul>
    </li>
  );
}
