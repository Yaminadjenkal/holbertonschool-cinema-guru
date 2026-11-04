import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

export default function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) {
  const tagsList = [
    'action',
    'drama',
    'comedy',
    'biography',
    'romance',
    'thriller',
    'war',
    'history',
    'sport',
    'sci-fi',
    'documentary',
    'crime',
    'fantasy',
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' },
  ];

  return (
    <div className="filter-container">
      <SearchBar title={title} setTitle={setTitle} />
      <div className="filter-inputs">
        <Input
          label="Min Year"
          type="number"
          value={minYear}
          setValue={setMinYear}
        />
        <Input
          label="Max Year"
          type="number"
          value={maxYear}
          setValue={setMaxYear}
        />
        <SelectInput
          label="Sort by"
          options={sortOptions}
          value={sort}
          setValue={setSort}
        />
      </div>
      <ul className="tags-list">
        {tagsList.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
}
