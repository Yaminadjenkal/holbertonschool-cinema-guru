import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import Filter from '../../components/movies/Filter';
import MovieCard from '../../components/movies/MovieCard';
import Button from '../../components/general/Button';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  const loadMovies = (pageToLoad) => {
    axios
      .get('/api/titles/advancedsearch', {
        params: {
          minYear,
          maxYear,
          genres: genres.join(','),
          title,
          sort,
          page: pageToLoad,
        },
      })
      .then((response) => {
        if (pageToLoad === 1) {
          setMovies(response.data || []);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...(response.data || [])]);
        }
      })
      .catch((error) => {
        console.error('Error loading movies:', error);
      });
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || movie.imdbId || index} movie={movie} />
        ))}
      </ul>
      <div className="load-more-container">
        <Button label="Load More.." onClick={handleLoadMore} />
      </div>
    </div>
  );
}
