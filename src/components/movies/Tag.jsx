import { useState } from 'react';
import './movies.css';

export default function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      setGenres(genres.filter((g) => g !== genre));
      setSelected(false);
    } else {
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag-item ${selected ? 'selected' : ''}`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
}
