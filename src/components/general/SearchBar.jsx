import './general.css';

export default function SearchBar({
  title,
  setTitle
}) {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={title}
        onChange={handleInput}
      />
    </div>
  );
}
